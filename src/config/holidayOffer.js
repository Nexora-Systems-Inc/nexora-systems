// Holiday Launch Special promotion window.
// End of Dec 15, 2026 in America/Toronto (EST, UTC-5) = 2026-12-16T05:00:00Z.
// Checked at runtime on the client so a cached build still hides the promo.
export const HOLIDAY_OFFER_END = Date.parse('2026-12-16T05:00:00Z');

export function isHolidayOfferActive(now = Date.now()) {
  return now < HOLIDAY_OFFER_END;
}
