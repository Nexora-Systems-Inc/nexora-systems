/**
 * Proposal renderer layout settings.
 * Orientation is a renderer config (not a UI control) so future document
 * types can opt into portrait without hardcoding page geometry.
 */

export const ORIENTATION = {
  landscape: 'landscape',
  portrait: 'portrait',
};

/** Default for proposal documents — landscape Letter. */
export const DEFAULT_ORIENTATION = ORIENTATION.landscape;

/**
 * @typedef {typeof ORIENTATION[keyof typeof ORIENTATION]} ProposalOrientation
 */

/**
 * @type {Record<ProposalOrientation, {
 *   id: ProposalOrientation,
 *   pageWidthIn: number,
 *   pageHeightIn: number,
 *   cssPageSize: string,
 *   margin: string,
 * }>}
 */
export const ORIENTATION_CONFIG = {
  [ORIENTATION.landscape]: {
    id: ORIENTATION.landscape,
    pageWidthIn: 11,
    pageHeightIn: 8.5,
    cssPageSize: 'letter landscape',
    margin: '0.45in 0.55in 0.6in',
  },
  [ORIENTATION.portrait]: {
    id: ORIENTATION.portrait,
    pageWidthIn: 8.5,
    pageHeightIn: 11,
    cssPageSize: 'letter portrait',
    margin: '0.5in 0.6in 0.7in',
  },
};

/**
 * @param {string} orientation
 * @returns {typeof ORIENTATION_CONFIG[ProposalOrientation]}
 */
export function getOrientationConfig(orientation) {
  return (
    ORIENTATION_CONFIG[orientation] ||
    ORIENTATION_CONFIG[DEFAULT_ORIENTATION]
  );
}

/**
 * CSS for print/PDF page box matching the active orientation.
 * @param {string} orientation
 */
export function buildPrintPageCss(orientation) {
  const config = getOrientationConfig(orientation);
  return `@media print {
  @page {
    size: ${config.cssPageSize};
    margin: ${config.margin};
  }
}`;
}
