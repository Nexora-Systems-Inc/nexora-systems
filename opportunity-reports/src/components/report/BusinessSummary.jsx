import { useReveal } from '../../hooks/useReveal'
import './BusinessSummary.css'

export function BusinessSummary({ meta, body }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="business-summary reveal">
      <div className="business-summary-copy">
        {body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <aside className="business-summary-panel">
        <p className="eyebrow">Business snapshot</p>
        <h3>{meta.businessName}</h3>
        <p className="business-summary-tagline">{meta.tagline}</p>
        <dl>
          <div>
            <dt>Industry</dt>
            <dd>{meta.industry}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>
              {meta.city}, {meta.region}
            </dd>
          </div>
          {meta.address ? (
            <div>
              <dt>Address</dt>
              <dd>{meta.address}</dd>
            </div>
          ) : null}
          {meta.phone ? (
            <div>
              <dt>Phone</dt>
              <dd>{meta.phone}</dd>
            </div>
          ) : null}
        </dl>
      </aside>
    </div>
  )
}
