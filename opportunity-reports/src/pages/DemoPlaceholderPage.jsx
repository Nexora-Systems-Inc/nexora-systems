import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getReport } from '../data/registry'
import { Button } from '../components/ui/Button'
import './DemoPlaceholderPage.css'

export function DemoPlaceholderPage() {
  const { slug } = useParams()
  const report = getReport(slug)

  useEffect(() => {
    if (!report) return undefined
    document.title = `${report.meta.businessName} — Website Concept | Nexora`
    window.scrollTo(0, 0)
    return undefined
  }, [report])

  if (!report) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="demo-placeholder">
      <div className="demo-placeholder-panel">
        <p className="eyebrow">Website concept preview</p>
        <h1>{report.meta.businessName}</h1>
        <p className="demo-placeholder-lede">
          This route is reserved for the interactive website concept demo.
          The report framework is ready — the tailored preview experience will
          be built here next.
        </p>
        <div className="demo-placeholder-actions">
          <Button to={`/${report.slug}`} variant="primary">
            Back to opportunity report
          </Button>
          <Button to="/" variant="ghost">
            All reports
          </Button>
        </div>
        <p className="demo-placeholder-path">
          Prepared route: <code>/{report.slug}/demo</code>
        </p>
        <Link to={`/${report.slug}#preview`} className="demo-placeholder-note">
          Return to the preview section
        </Link>
      </div>
    </div>
  )
}
