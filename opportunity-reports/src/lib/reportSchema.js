/**
 * Opportunity Report schema (documentation + lightweight helpers).
 *
 * This is the contract future reports — and eventually a generator —
 * should satisfy. Keep components dumb; put meaning in the data.
 *
 * @typedef {Object} ReportTheme
 * @property {string} [accent]
 * @property {string} [accentSoft]
 * @property {string} [heroImage]
 * @property {string} [heroImageAlt]
 * @property {string} [atmosphere] - CSS background hint class name
 *
 * @typedef {Object} ReportMeta
 * @property {string} businessName
 * @property {string} legalName
 * @property {string} industry
 * @property {string} city
 * @property {string} region
 * @property {string} country
 * @property {string} [address]
 * @property {string} [phone]
 * @property {string} [tagline]
 * @property {string[]} [sources]
 * @property {string} preparedBy
 * @property {string} preparedFor
 * @property {string} dateLabel
 *
 * @typedef {Object} PresenceChannel
 * @property {string} id
 * @property {string} label
 * @property {string} status - e.g. Active, Limited, Not found
 * @property {string} summary
 * @property {string} [url]
 *
 * @typedef {Object} RatingSummary
 * @property {string} platform
 * @property {number|null} score
 * @property {string} scoreLabel
 * @property {string} [countLabel]
 * @property {string} note
 *
 * @typedef {Object} ContentCard
 * @property {string} id
 * @property {string} title
 * @property {string} body
 * @property {string} [detail]
 * @property {string} [icon] - logical icon key resolved by UI
 *
 * @typedef {Object} ImpactItem
 * @property {string} id
 * @property {string} title
 * @property {string} body
 *
 * @typedef {Object} QuoteItem
 * @property {string} id
 * @property {string} text
 * @property {string} attribution
 * @property {string} [source]
 *
 * @typedef {Object} OpportunityReport
 * @property {string} slug
 * @property {ReportMeta} meta
 * @property {ReportTheme} [theme]
 * @property {{ eyebrow: string, title: string, lede: string, body: string[] }} intro
 * @property {{ title: string, lede: string, channels: PresenceChannel[], ratings: RatingSummary[], summary: string }} presence
 * @property {{ title: string, lede: string, items: ContentCard[] }} strengths
 * @property {{ title: string, lede: string, items: ContentCard[] }} opportunities
 * @property {{ title: string, lede: string, items: ContentCard[] }} recommendations
 * @property {{ title: string, lede: string, items: ImpactItem[] }} impact
 * @property {{ title: string, lede: string, ctaLabel: string, ctaTo: string, note: string }} preview
 * @property {{ title: string, body: string[], closing: string }} nextSteps
 * @property {QuoteItem[]} [quotes]
 */

/**
 * @param {import('./reportSchema.js').OpportunityReport | undefined} report
 * @returns {string[]}
 */
export function validateReport(report) {
  const errors = []
  if (!report) return ['Report is missing']
  if (!report.slug) errors.push('slug is required')
  if (!report.meta?.businessName) errors.push('meta.businessName is required')

  const requiredSections = [
    'intro',
    'presence',
    'strengths',
    'opportunities',
    'recommendations',
    'impact',
    'preview',
    'nextSteps',
  ]

  for (const key of requiredSections) {
    if (!report[key]) errors.push(`section "${key}" is required`)
  }

  return errors
}
