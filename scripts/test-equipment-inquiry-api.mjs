/**
 * Lightweight unit checks for equipment inquiry helpers.
 * Run: node scripts/test-equipment-inquiry-api.mjs
 */
import assert from 'node:assert/strict';
import {
  buildEquipmentInquiryEmail,
  validateEquipmentInquiryPayload,
} from '../api/_lib/equipmentInquiry.js';

let passed = 0;

function test(name, fn) {
  fn();
  passed += 1;
  console.log(`✓ ${name}`);
}

const base = {
  name: 'Jordan Lee',
  company: 'Lakeview Fab',
  email: 'jordan@example.com',
  phone: '416-555-0100',
  city: 'Mississauga',
  province: 'Ontario',
  country: 'Canada',
  buyerType: 'End User',
  inquiryType: 'General Question',
  message: 'Interested in inspecting the machine.',
  equipmentSlug: 'hankwang-fl3015',
  equipmentTitle: '2011 HANKWANG FL3015',
};

test('rejects incomplete payload', () => {
  const result = validateEquipmentInquiryPayload({});
  assert.equal(result.ok, false);
  assert.ok(result.fields?.name);
  assert.ok(result.fields?.email);
});

test('requires offer amount for Make an Offer', () => {
  const result = validateEquipmentInquiryPayload({
    ...base,
    inquiryType: 'Make an Offer',
    offerAmount: '',
  });
  assert.equal(result.ok, false);
  assert.ok(result.fields?.offerAmount);
});

test('accepts a clean inquiry', () => {
  const result = validateEquipmentInquiryPayload(base);
  assert.equal(result.ok, true);
  assert.equal(result.data.spam, false);
  assert.equal(result.data.email, 'jordan@example.com');
});

test('honeypot returns silent spam success shape', () => {
  const result = validateEquipmentInquiryPayload({
    ...base,
    website: 'http://spam.example',
  });
  assert.equal(result.ok, true);
  assert.equal(result.data.spam, true);
});

test('buildEquipmentInquiryEmail includes listing and escapes HTML', () => {
  const email = buildEquipmentInquiryEmail({
    ...base,
    name: 'Jordan <script>',
    inquiryType: 'Make an Offer',
    offerAmount: 'C$60,000',
  });
  assert.match(email.subject, /Make an Offer/);
  assert.match(email.subject, /HANKWANG/);
  assert.match(email.text, /C\$60,000/);
  assert.match(email.html, /Jordan &lt;script&gt;/);
  assert.doesNotMatch(email.html, /<script>/);
});

console.log(`\n${passed} tests passed.`);
