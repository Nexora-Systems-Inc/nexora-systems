import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getReport } from '../data/registry'
import { validateReport } from '../lib/reportSchema'
import { ReportNav } from '../components/report/ReportNav'
import { ReportHero } from '../components/report/ReportHero'
import { SectionHeader } from '../components/report/SectionHeader'
import { BusinessSummary } from '../components/report/BusinessSummary'
import { PresenceSummary } from '../components/report/PresenceSummary'
import { RatingSummary } from '../components/report/RatingSummary'
import { ContentCardGrid } from '../components/report/ContentCard'
import { QuoteBlock } from '../components/report/QuoteBlock'
import { ImpactBlock } from '../components/report/ImpactBlock'
import { CtaSection } from '../components/report/CtaSection'
import { NextSteps } from '../components/report/NextSteps'
import './ReportPage.css'

export function ReportPage() {
  const { slug } = useParams()
  const report = getReport(slug)

  useEffect(() => {
    if (!report) return undefined
    document.title = `${report.meta.businessName} — Opportunity Report | Nexora`
    window.scrollTo(0, 0)
    return undefined
  }, [report])

  if (!report) {
    return <Navigate to="/" replace />
  }

  const errors = validateReport(report)
  if (errors.length && import.meta.env.DEV) {
    console.warn(`[report:${report.slug}]`, errors)
  }

  const themeStyle = {
    '--report-accent': report.theme?.accent,
    '--report-accent-soft': report.theme?.accentSoft,
  }

  const scrollToIntro = () => {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className={`report-page ${report.theme?.atmosphere || ''}`.trim()}
      data-report-theme
      style={themeStyle}
    >
      <ReportNav
        businessName={report.meta.businessName}
        demoTo={report.preview.ctaTo}
      />

      <ReportHero report={report} onExplore={scrollToIntro} />

      <main>
        <section id="intro" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="01 — Introduction"
              title={report.intro.title}
              lede={report.intro.lede}
            />
            <BusinessSummary meta={report.meta} body={report.intro.body} />
          </div>
        </section>

        <section id="presence" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="02 — Current online presence"
              title={report.presence.title}
              lede={report.presence.lede}
            />
            <PresenceSummary
              channels={report.presence.channels}
              summary={report.presence.summary}
            />
            <div className="report-ratings-wrap">
              <h3 className="report-subheading">Public rating snapshot</h3>
              <RatingSummary ratings={report.presence.ratings} />
            </div>
          </div>
        </section>

        <section id="strengths" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="03 — What’s working well"
              title={report.strengths.title}
              lede={report.strengths.lede}
            />
            <ContentCardGrid items={report.strengths.items} variant="default" />
            <QuoteBlock quotes={report.quotes} />
          </div>
        </section>

        <section id="opportunities" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="04 — Missed opportunities"
              title={report.opportunities.title}
              lede={report.opportunities.lede}
            />
            <ContentCardGrid
              items={report.opportunities.items}
              variant="opportunity"
            />
          </div>
        </section>

        <section id="recommendations" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="05 — Recommendations"
              title={report.recommendations.title}
              lede={report.recommendations.lede}
            />
            <ContentCardGrid
              items={report.recommendations.items}
              variant="recommendation"
            />
          </div>
        </section>

        <section id="impact" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="06 — Potential business impact"
              title={report.impact.title}
              lede={report.impact.lede}
            />
            <ImpactBlock items={report.impact.items} />
          </div>
        </section>

        <section id="preview" className="section">
          <div className="container">
            <SectionHeader
              eyebrow="07 — Website preview"
              title="See the concept"
              lede="A premium call-to-action into a tailored website preview for this business."
            />
            <CtaSection preview={report.preview} />
          </div>
        </section>

        <section id="next-steps" className="section section-alt">
          <div className="container">
            <SectionHeader
              eyebrow="08 — Next steps"
              title={report.nextSteps.title}
            />
            <NextSteps nextSteps={report.nextSteps} meta={report.meta} />
          </div>
        </section>
      </main>

      <footer className="report-footer">
        <div className="container report-footer-inner">
          <p>Nexora Systems — Opportunity Reports</p>
          <p>Crafted to educate, illuminate, and invite conversation.</p>
        </div>
      </footer>
    </div>
  )
}
