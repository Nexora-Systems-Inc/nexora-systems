import { lePetitPainReport } from './reports/le-petit-pain'

/** @type {Record<string, import('../lib/reportSchema').OpportunityReport>} */
export const reportRegistry = {
  [lePetitPainReport.slug]: lePetitPainReport,
}

export function getReport(slug) {
  if (!slug) return null
  return reportRegistry[slug] ?? null
}

export function listReports() {
  return Object.values(reportRegistry)
}
