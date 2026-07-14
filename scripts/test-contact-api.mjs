/**
 * Lightweight unit checks for contact API helpers (no network / Resend calls).
 * Run: node scripts/test-contact-api.mjs
 */
import assert from 'node:assert/strict';
import {
  buildContactEmail,
  escapeHtml,
  getContactEmailConfig,
  sanitizeText,
  validateContactPayload,
} from '../api/_lib/contact.js';

let passed = 0;

function test(name, fn) {
  fn();
  passed += 1;
  console.log(`✓ ${name}`);
}

test('sanitizeText trims, strips control chars, and caps length', () => {
  assert.equal(sanitizeText('  Hello\u0000World  ', 8), 'HelloWor');
  assert.equal(sanitizeText(null, 10), '');
  assert.equal(sanitizeText(42, 10), '');
});

test('escapeHtml encodes markup characters', () => {
  assert.equal(
    escapeHtml(`<a href="x">O'Reilly & Co</a>`),
    '&lt;a href=&quot;x&quot;&gt;O&#39;Reilly &amp; Co&lt;/a&gt;',
  );
});

test('validateContactPayload rejects empty / invalid fields', () => {
  const empty = validateContactPayload({});
  assert.equal(empty.ok, false);
  assert.ok(empty.fields?.name);
  assert.ok(empty.fields?.email);
  assert.ok(empty.fields?.message);

  const badEmail = validateContactPayload({
    name: 'Ada',
    email: 'not-an-email',
    message: 'Hello',
  });
  assert.equal(badEmail.ok, false);
  assert.ok(badEmail.fields?.email);
});

test('validateContactPayload accepts a clean payload', () => {
  const result = validateContactPayload({
    name: '  Ada Lovelace ',
    email: 'Ada@Example.COM',
    company: 'Analytical Engines',
    service: 'CrewPilot',
    message: 'I would like a demo.',
  });
  assert.equal(result.ok, true);
  assert.equal(result.data.name, 'Ada Lovelace');
  assert.equal(result.data.email, 'ada@example.com');
  assert.equal(result.data.company, 'Analytical Engines');
  assert.equal(result.data.service, 'CrewPilot');
  assert.equal(result.data.message, 'I would like a demo.');
});

test('buildContactEmail includes fields safely in HTML', () => {
  const email = buildContactEmail({
    name: 'Ada <script>',
    email: 'ada@example.com',
    company: '',
    service: 'CrewPilot',
    message: 'Line 1\nLine 2',
  });
  assert.match(email.subject, /CrewPilot/);
  assert.match(email.text, /Ada <script>/);
  assert.match(email.html, /Ada &lt;script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
});

test('getContactEmailConfig requires env vars', () => {
  const prev = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  };

  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO_EMAIL;
  delete process.env.RESEND_FROM_EMAIL;

  const missing = getContactEmailConfig();
  assert.equal(missing.ok, false);

  process.env.RESEND_API_KEY = 're_test';
  process.env.CONTACT_TO_EMAIL = 'inbox@example.com';
  process.env.RESEND_FROM_EMAIL = 'Nexora Systems <noreply@example.com>';

  const ok = getContactEmailConfig();
  assert.equal(ok.ok, true);
  assert.equal(ok.config.toEmail, 'inbox@example.com');

  for (const [key, value] of Object.entries(prev)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

console.log(`\n${passed} tests passed.`);
