/** Shared equipment-inquiry validation and email helpers (server-only). */

import { escapeHtml, sanitizeText } from './contact.js';

export const EQUIPMENT_FIELD_LIMITS = {
  name: 100,
  company: 150,
  email: 254,
  phone: 40,
  city: 100,
  province: 100,
  country: 100,
  buyerType: 40,
  inquiryType: 40,
  offerAmount: 40,
  message: 5000,
  equipmentSlug: 120,
  equipmentTitle: 200,
  website: 200, // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BUYER_TYPES = ['End User', 'Machinery Dealer', 'Broker', 'Other'];
export const INQUIRY_TYPES = ['General Question', 'Request Inspection', 'Make an Offer'];

/**
 * Validate and sanitize an equipment inquiry payload.
 * @param {unknown} body
 */
export function validateEquipmentInquiryPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Invalid request body.' };
  }

  const raw = /** @type {Record<string, unknown>} */ (body);

  // Honeypot — bots often fill hidden "website" fields.
  const website = sanitizeText(raw.website, EQUIPMENT_FIELD_LIMITS.website);
  if (website) {
    return { ok: true, data: { spam: true } };
  }

  const name = sanitizeText(raw.name, EQUIPMENT_FIELD_LIMITS.name);
  const company = sanitizeText(raw.company, EQUIPMENT_FIELD_LIMITS.company);
  const email = sanitizeText(raw.email, EQUIPMENT_FIELD_LIMITS.email).toLowerCase();
  const phone = sanitizeText(raw.phone, EQUIPMENT_FIELD_LIMITS.phone);
  const city = sanitizeText(raw.city, EQUIPMENT_FIELD_LIMITS.city);
  const province = sanitizeText(raw.province, EQUIPMENT_FIELD_LIMITS.province);
  const country = sanitizeText(raw.country, EQUIPMENT_FIELD_LIMITS.country);
  const buyerType = sanitizeText(raw.buyerType, EQUIPMENT_FIELD_LIMITS.buyerType);
  const inquiryType = sanitizeText(raw.inquiryType, EQUIPMENT_FIELD_LIMITS.inquiryType);
  const offerAmount = sanitizeText(raw.offerAmount, EQUIPMENT_FIELD_LIMITS.offerAmount);
  const message = sanitizeText(raw.message, EQUIPMENT_FIELD_LIMITS.message);
  const equipmentSlug = sanitizeText(raw.equipmentSlug, EQUIPMENT_FIELD_LIMITS.equipmentSlug);
  const equipmentTitle = sanitizeText(raw.equipmentTitle, EQUIPMENT_FIELD_LIMITS.equipmentTitle);

  /** @type {Record<string, string>} */
  const fields = {};

  if (!name) fields.name = 'Name is required.';
  if (!company) fields.company = 'Company is required.';
  if (!email) fields.email = 'Email is required.';
  else if (!EMAIL_RE.test(email)) fields.email = 'Email address is invalid.';
  if (!phone) fields.phone = 'Phone is required.';
  if (!city) fields.city = 'City is required.';
  if (!province) fields.province = 'Province is required.';
  if (!country) fields.country = 'Country is required.';
  if (!BUYER_TYPES.includes(buyerType)) fields.buyerType = 'Select a buyer type.';
  if (!INQUIRY_TYPES.includes(inquiryType)) fields.inquiryType = 'Select an inquiry type.';
  if (inquiryType === 'Make an Offer' && !offerAmount) {
    fields.offerAmount = 'Offer amount is required when making an offer.';
  }
  if (!message) fields.message = 'Message is required.';
  if (!equipmentSlug) fields.equipmentSlug = 'Equipment listing is required.';

  if (Object.keys(fields).length > 0) {
    return { ok: false, error: 'Please check your details and try again.', fields };
  }

  return {
    ok: true,
    data: {
      spam: false,
      name,
      company,
      email,
      phone,
      city,
      province,
      country,
      buyerType,
      inquiryType,
      offerAmount,
      message,
      equipmentSlug,
      equipmentTitle: equipmentTitle || equipmentSlug,
    },
  };
}

/**
 * @param {ReturnType<typeof validateEquipmentInquiryPayload> extends { ok: true, data: infer D } ? D : never} data
 */
export function buildEquipmentInquiryEmail(data) {
  const subject = `Equipment Inquiry — ${data.equipmentTitle} — ${data.inquiryType}`;

  const text = [
    'New equipment inquiry from nexorasystems.ca',
    '',
    `Equipment: ${data.equipmentTitle}`,
    `Listing: /equipment/${data.equipmentSlug}`,
    `Inquiry: ${data.inquiryType}`,
    data.offerAmount ? `Offer Amount: ${data.offerAmount}` : null,
    '',
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    `Province: ${data.province}`,
    `Country: ${data.country}`,
    `Buyer Type: ${data.buyerType}`,
    '',
    'Message:',
    data.message,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const rows = [
    ['Equipment', data.equipmentTitle],
    ['Listing', `/equipment/${data.equipmentSlug}`],
    ['Inquiry', data.inquiryType],
    data.offerAmount ? ['Offer Amount', data.offerAmount] : null,
    ['Name', data.name],
    ['Company', data.company],
    ['Email', data.email],
    ['Phone', data.phone],
    ['City', data.city],
    ['Province', data.province],
    ['Country', data.country],
    ['Buyer Type', data.buyerType],
  ].filter(Boolean);

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 6px 0; font-weight: bold; width: 140px; vertical-align: top;">${escapeHtml(label)}</td>
          <td style="padding: 6px 0;">${
            label === 'Email'
              ? `<a href="mailto:${escapeHtml(value)}">${escapeHtml(value)}</a>`
              : escapeHtml(value)
          }</td>
        </tr>`,
    )
    .join('');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="margin: 0 0 16px;">New equipment inquiry from <strong>nexorasystems.ca</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${htmlRows}
      </table>
      <p style="margin: 20px 0 8px; font-weight: bold;">Message</p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}
