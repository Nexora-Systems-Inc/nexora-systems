import assert from 'node:assert/strict';
import { isHolidayOfferActive, HOLIDAY_OFFER_END } from '../src/config/holidayOffer.js';
assert.equal(HOLIDAY_OFFER_END, Date.parse('2026-12-15T23:59:59.999-05:00') + 1);
assert.equal(isHolidayOfferActive(Date.parse('2026-11-03T12:00:00Z')), true);
assert.equal(isHolidayOfferActive(Date.parse('2026-12-15T23:59:59-05:00')), true);
assert.equal(isHolidayOfferActive(Date.parse('2026-12-16T00:00:00-05:00')), false);
assert.equal(isHolidayOfferActive(Date.parse('2027-01-10T00:00:00Z')), false);
console.log('holiday offer cutoff: 4/4 pass');
