/**
 * Analytics configuration — leave IDs empty until launch.
 * Set values here or via VITE_* env vars at build time.
 *
 * Supported: Google Analytics 4, Microsoft Clarity, Meta Pixel.
 */
export const analyticsConfig = {
  googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
  microsoftClarityId: import.meta.env.VITE_CLARITY_ID || '',
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
};

export function isAnalyticsEnabled() {
  const { googleAnalyticsId, microsoftClarityId, metaPixelId } = analyticsConfig;
  return Boolean(googleAnalyticsId || microsoftClarityId || metaPixelId);
}
