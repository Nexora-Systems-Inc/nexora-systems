/** Shared contact-form validation and email helpers (server-only). */

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  service: 120,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strip control characters and trim. Does not mutate beyond a hard length cap.
 * @param {unknown} value
 * @param {number} maxLength
 */
export function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * @param {string} value
 */
export function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validate and sanitize an incoming contact payload.
 * @param {unknown} body
 * @returns {{ ok: true, data: {
 *   name: string,
 *   email: string,
 *   company: string,
 *   service: string,
 *   message: string,
 * }} | { ok: false, error: string, fields?: Record<string, string> }}
 */
export function validateContactPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Invalid request body.' };
  }

  const raw = /** @type {Record<string, unknown>} */ (body);
  const name = sanitizeText(raw.name, FIELD_LIMITS.name);
  const email = sanitizeText(raw.email, FIELD_LIMITS.email).toLowerCase();
  const company = sanitizeText(raw.company, FIELD_LIMITS.company);
  const service = sanitizeText(raw.service, FIELD_LIMITS.service);
  const message = sanitizeText(raw.message, FIELD_LIMITS.message);

  /** @type {Record<string, string>} */
  const fields = {};

  if (!name) fields.name = 'Name is required.';
  if (!email) fields.email = 'Email is required.';
  else if (!EMAIL_RE.test(email)) fields.email = 'Email address is invalid.';
  if (!message) fields.message = 'Message is required.';

  if (Object.keys(fields).length > 0) {
    return { ok: false, error: 'Please check your details and try again.', fields };
  }

  return {
    ok: true,
    data: { name, email, company, service, message },
  };
}

/**
 * @param {{
 *   name: string,
 *   email: string,
 *   company: string,
 *   service: string,
 *   message: string,
 * }} data
 */
export function buildContactEmail(data) {
  const subject = data.service
    ? `Nexora Inquiry — ${data.service}`
    : 'Nexora Inquiry';

  const text = [
    'New contact form submission from nexorasystems.ca',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || 'N/A'}`,
    `Service: ${data.service || 'N/A'}`,
    '',
    'Message:',
    data.message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <p style="margin: 0 0 16px;">New contact form submission from <strong>nexorasystems.ca</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr>
          <td style="padding: 6px 0; font-weight: bold; width: 100px;">Name</td>
          <td style="padding: 6px 0;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold;">Email</td>
          <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold;">Company</td>
          <td style="padding: 6px 0;">${escapeHtml(data.company || 'N/A')}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: bold;">Service</td>
          <td style="padding: 6px 0;">${escapeHtml(data.service || 'N/A')}</td>
        </tr>
      </table>
      <p style="margin: 20px 0 8px; font-weight: bold;">Message</p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

/**
 * Read server-only email configuration from environment variables.
 * @returns {{ ok: true, config: {
 *   apiKey: string,
 *   toEmail: string,
 *   fromEmail: string,
 * }} | { ok: false, error: string }}
 */
export function getContactEmailConfig() {
  const apiKey = typeof process.env.RESEND_API_KEY === 'string'
    ? process.env.RESEND_API_KEY.trim()
    : '';
  const toEmail = typeof process.env.CONTACT_TO_EMAIL === 'string'
    ? process.env.CONTACT_TO_EMAIL.trim()
    : '';
  const fromEmail = typeof process.env.RESEND_FROM_EMAIL === 'string'
    ? process.env.RESEND_FROM_EMAIL.trim()
    : '';

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false,
      error: 'Contact email is not configured. Please try again later.',
    };
  }

  return {
    ok: true,
    config: { apiKey, toEmail, fromEmail },
  };
}
