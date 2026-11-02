import { Resend } from 'resend';
import { getContactEmailConfig } from './_lib/contact.js';
import {
  buildEquipmentInquiryEmail,
  validateEquipmentInquiryPayload,
} from './_lib/equipmentInquiry.js';

/**
 * Vercel Serverless Function — POST /api/equipment-inquiry
 * Equipment marketplace lead capture. Delivers via the same Resend inbox
 * as the main contact form (CONTACT_TO_EMAIL).
 */
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({
      success: false,
      error: 'Method not allowed.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON body.',
      });
    }
  }

  const validated = validateEquipmentInquiryPayload(body);
  if (!validated.ok) {
    return res.status(400).json({
      success: false,
      error: validated.error,
      fields: validated.fields,
    });
  }

  // Honeypot tripped — pretend success without sending.
  if (validated.data.spam) {
    return res.status(200).json({ success: true, id: null });
  }

  const configResult = getContactEmailConfig();
  if (!configResult.ok) {
    console.error('[equipment-inquiry] Missing RESEND_API_KEY, CONTACT_TO_EMAIL, or RESEND_FROM_EMAIL');
    return res.status(503).json({
      success: false,
      error: configResult.error,
    });
  }

  const { apiKey, toEmail, fromEmail } = configResult.config;
  const { subject, text, html } = buildEquipmentInquiryEmail(validated.data);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: validated.data.email,
      subject,
      text,
      html,
      tags: [
        { name: 'source', value: 'equipment-inquiry' },
        { name: 'equipment', value: validated.data.equipmentSlug.slice(0, 50) },
      ],
    });

    if (error) {
      console.error('[equipment-inquiry] Resend error:', error);
      return res.status(502).json({
        success: false,
        error: 'Unable to send your inquiry right now. Please try again shortly.',
      });
    }

    return res.status(200).json({
      success: true,
      id: data?.id ?? null,
    });
  } catch (err) {
    console.error('[equipment-inquiry] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to send your inquiry right now. Please try again shortly.',
    });
  }
}
