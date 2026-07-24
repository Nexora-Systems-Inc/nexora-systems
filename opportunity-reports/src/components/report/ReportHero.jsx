import { Button } from '../ui/Button'
import './ReportHero.css'

export function ReportHero({ report, onExplore }) {
  const { meta, intro, theme } = report

  return (
    <section className="report-hero hero-animate">
      <div className="report-hero-media" aria-hidden={!theme?.heroImage}>
        {theme?.heroImage ? (
          <img src={theme.heroImage} alt={theme.heroImageAlt || ''} />
        ) : null}
        <div className="report-hero-scrim" />
      </div>

      <div className="container report-hero-content">
        <div className="report-hero-brand motion-safe">
          <span className="report-hero-nexora">Nexora Systems</span>
          <span className="report-hero-divider" aria-hidden="true" />
          <span>{meta.dateLabel}</span>
        </div>

        <p className="eyebrow report-hero-eyebrow">{intro.eyebrow}</p>
        <h1>
          <span className="report-hero-business">{meta.businessName}</span>
          <span className="report-hero-title">{intro.title}</span>
        </h1>
        <p className="report-hero-lede">{intro.lede}</p>

        <div className="report-hero-meta">
          <span>{meta.legalName}</span>
          <span>
            {meta.city}, {meta.region}
          </span>
          <span>{meta.industry}</span>
        </div>

        <div className="report-hero-actions">
          <Button variant="light" onClick={onExplore}>
            Explore the report
          </Button>
          <Button variant="ghost" to={report.preview.ctaTo} className="report-hero-secondary">
            {report.preview.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
