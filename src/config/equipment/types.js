/**
 * @typedef {Object} EquipmentPrice
 * @property {number} amount
 * @property {'CAD' | 'USD'} currency
 * @property {string} display
 * @property {boolean} [negotiable]
 */

/**
 * @typedef {Object} EquipmentLocation
 * @property {string} region
 * @property {string} country
 * @property {string} display
 */

/**
 * @typedef {Object} EquipmentFact
 * @property {string} label
 * @property {string} value
 */

/**
 * @typedef {Object} EquipmentImage
 * @property {string} id
 * @property {string | null} src
 * @property {string} alt
 * @property {string} caption
 * @property {'hero' | 'gallery' | 'og'} [role]
 * @property {boolean} [required]
 */

/**
 * @typedef {Object} EquipmentFaq
 * @property {string} question
 * @property {string | null} answer
 * @property {boolean} [requiresInquiry]
 * @property {string} [inquiryPrompt]
 */

/**
 * @typedef {Object} EquipmentListing
 * @property {string} slug
 * @property {'available' | 'pending' | 'sold'} status
 * @property {string} manufacturer
 * @property {string} model
 * @property {number} year
 * @property {string} serial
 * @property {string} title
 * @property {string} subtitle
 * @property {string} cardSummary
 * @property {EquipmentPrice} price
 * @property {EquipmentLocation} location
 * @property {string} conditionStatus
 * @property {EquipmentFact[]} heroHighlights
 * @property {EquipmentFact[]} keyFacts
 * @property {string[]} overview
 * @property {EquipmentFact[]} specifications
 * @property {string[]} includedEquipment
 * @property {{ summary: string, details: string[] }} condition
 * @property {{ approximateWeight: string, approximateDimensions: string, notes: string[] }} logistics
 * @property {EquipmentImage[]} images
 * @property {EquipmentFaq[]} faqs
 * @property {string} representation
 * @property {{ title: string, description: string, ogTitle?: string, ogDescription?: string }} seo
 */

export {};
