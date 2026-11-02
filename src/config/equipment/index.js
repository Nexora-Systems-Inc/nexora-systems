/**
 * Equipment marketplace registry.
 * Add a new listing file under ./listings and register it in EQUIPMENT_LISTINGS.
 */

import hankwangFl3015 from './listings/hankwang-fl3015.js';

/** @type {import('./types.js').EquipmentListing[]} */
export const EQUIPMENT_LISTINGS = [hankwangFl3015];

export const EQUIPMENT_INDEX_META = {
  path: '/equipment',
  title: 'Equipment Marketplace | Nexora Systems',
  description:
    'Professionally presented industrial equipment available through Nexora clients and partners. Browse used CNC and fabrication machinery listed for sale in Canada.',
  heading: 'Equipment Marketplace',
  subheading:
    'Professionally presented industrial equipment available through Nexora clients and partners.',
};

/**
 * @param {string} slug
 * @returns {import('./types.js').EquipmentListing | undefined}
 */
export function getEquipmentBySlug(slug) {
  if (!slug) return undefined;
  return EQUIPMENT_LISTINGS.find((item) => item.slug === slug);
}

/** @returns {import('./types.js').EquipmentListing[]} */
export function listAvailableEquipment() {
  return EQUIPMENT_LISTINGS.filter((item) => item.status !== 'sold');
}

/**
 * @param {import('./types.js').EquipmentListing} listing
 * @returns {string}
 */
export function getEquipmentPath(listing) {
  return `/equipment/${listing.slug}`;
}

/**
 * First usable photograph for hero / social sharing, if any.
 * @param {import('./types.js').EquipmentListing} listing
 * @returns {import('./types.js').EquipmentImage | null}
 */
export function getPrimaryEquipmentImage(listing) {
  if (!listing?.images?.length) return null;
  const withSrc = listing.images.filter((img) => img.src);
  if (!withSrc.length) return null;
  return (
    withSrc.find((img) => img.role === 'hero')
    || withSrc.find((img) => img.role === 'og')
    || withSrc[0]
  );
}

/**
 * Sitemap paths for equipment index + each listing.
 * @returns {string[]}
 */
export function getEquipmentSitemapPaths() {
  return [
    EQUIPMENT_INDEX_META.path,
    ...EQUIPMENT_LISTINGS.map((item) => getEquipmentPath(item)),
  ];
}
