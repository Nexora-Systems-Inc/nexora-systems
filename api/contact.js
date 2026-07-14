import { Resend } from 'resend';
import {
  buildContactEmail,
  getContactEmailConfig,
  validateContactPayload,
} from './_lib/contact.js';

/**
 * Vercel Serverless Function — POST /api/contact
 * Accepts contact form JSON and delivers it via Resend.
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

  const validated = validateContactPayload(body);
  if (!validated.ok) {
    return res.status(400).json({
      success: false,
      error: validated.error,
      fields: validated.fields,
    });
  }

  const configResult = getContactEmailConfig();
  if (!configResult.ok) {
    console.error('[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL, or RESEND_FROM_EMAIL');
    return res.status(503).json({
      success: false,
      error: configResult.error,
    });
  }

  const { apiKey, toEmail, fromEmail } = configResult.config;
  const { subject, text, html } = buildContactEmail(validated.data);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: validated.data.email,
      subject,
      text,
      html,
      tags: [{ name: 'source', value: 'website-contact' }],
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return res.status(502).json({
        success: false,
        error: 'Unable to send your message right now. Please try again shortly.',
      });
    }

    return res.status(200).json({
      success: true,
      id: data?.id ?? null,
    });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to send your message right now. Please try again shortly.',
    });
  }
}
