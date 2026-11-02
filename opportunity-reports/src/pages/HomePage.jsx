import { useEffect } from 'react'
import { listReports } from '../data/registry'
import { Button } from '../components/ui/Button'
import './HomePage.css'

export function HomePage() {
  const reports = listReports()

  useEffect(() => {
    document.title = 'Nexora Opportunity Reports'
  }, [])

  return (
    <div className="home-page">
      <header className="home-hero">
        <div className="container home-hero-inner">
          <p className="home-brand">Nexora Systems</p>
          <h1>Opportunity Reports</h1>
          <p className="home-lede">
            A reusable presentation system for polished, interactive business
            analyses — built to educate first, recommend second, and invite
            conversation without pressure.
          </p>
        </div>
      </header>

      <main className="section">
        <div className="container">
          <div className="home-section-head">
            <p className="eyebrow">Available reports</p>
            <h2>Prospect experiences</h2>
            <p className="lede">
              Each report is assembled from shared components and business-specific
              content data. New clients should become a content entry — not a rebuild.
            </p>
          </div>

          <div className="home-report-list">
            {reports.map((report) => (
              <article key={report.slug} className="home-report-item">
                <div>
                  <p className="eyebrow">{report.meta.industry}</p>
                  <h3>{report.meta.businessName}</h3>
                  <p>
                    {report.meta.city}, {report.meta.region}
                  </p>
                </div>
                <div className="home-report-actions">
                  <Button to={`/${report.slug}`} variant="primary">
                    Open report
                  </Button>
                  <Button to={report.preview.ctaTo} variant="ghost">
                    Website preview
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <aside className="home-architecture-note">
            <p className="eyebrow">Architecture</p>
            <h3>Designed for many businesses</h3>
            <p>
              Bakeries, clinics, contractors, salons, hotels, manufacturers — the
              section model stays the same. Content and light theming change.
              Long-term generation guidance lives in{' '}
              <code>docs/ARCHITECTURE.md</code>.
            </p>
          </aside>
        </div>
      </main>
    </div>
  )
}
