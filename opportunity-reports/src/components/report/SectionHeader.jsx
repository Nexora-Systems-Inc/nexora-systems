import { useReveal } from '../../hooks/useReveal'
import './SectionHeader.css'

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
}) {
  const ref = useReveal()

  return (
    <header
      ref={ref}
      className={`section-header reveal align-${align} ${className}`.trim()}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
      <span className="section-header-rule" aria-hidden="true" />
    </header>
  )
}
