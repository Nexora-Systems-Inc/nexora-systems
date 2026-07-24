import { Button } from '../ui/Button'
import { useReveal } from '../../hooks/useReveal'
import './CtaSection.css'

export function CtaSection({ preview }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="cta-section reveal">
      <div className="cta-panel">
        <p className="eyebrow">Website concept</p>
        <h3>{preview.title}</h3>
        <p className="cta-lede">{preview.lede}</p>
        <Button to={preview.ctaTo} variant="accent" className="cta-button">
          {preview.ctaLabel}
          <span aria-hidden="true">→</span>
        </Button>
        <p className="cta-note">{preview.note}</p>
      </div>
    </div>
  )
}
