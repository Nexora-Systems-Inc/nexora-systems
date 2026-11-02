import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ReportNav.css'

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'presence', label: 'Presence' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'opportunities', label: 'Opportunities' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'impact', label: 'Impact' },
  { id: 'preview', label: 'Preview' },
  { id: 'next-steps', label: 'Next steps' },
]

export function ReportNav({ businessName, demoTo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`report-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Report">
      <div className="container report-nav-inner">
        <Link to="/" className="report-nav-brand">
          <span className="report-nav-mark">Nexora</span>
          <span className="report-nav-sub">{businessName}</span>
        </Link>

        <button
          type="button"
          className="report-nav-toggle"
          aria-expanded={open}
          aria-controls="report-section-links"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>

        <div
          id="report-section-links"
          className={`report-nav-links ${open ? 'is-open' : ''}`}
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setOpen(false)}
            >
              {section.label}
            </a>
          ))}
          <Link to={demoTo} className="report-nav-cta" onClick={() => setOpen(false)}>
            Website preview
          </Link>
        </div>
      </div>
    </nav>
  )
}
