import { useReveal } from '../../hooks/useReveal'
import './NextSteps.css'

export function NextSteps({ nextSteps, meta }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="next-steps reveal">
      <div className="next-steps-copy">
        {nextSteps.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="next-steps-closing">{nextSteps.closing}</p>
      </div>

      <aside className="next-steps-aside">
        <p className="eyebrow">Prepared by</p>
        <h3>{meta.preparedBy}</h3>
        <dl>
          <div>
            <dt>Prepared for</dt>
            <dd>{meta.preparedFor}</dd>
          </div>
          {meta.address ? (
            <div>
              <dt>Location</dt>
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
        {meta.sources?.length ? (
          <div className="next-steps-sources">
            <p className="eyebrow">Public sources reviewed</p>
            <ul>
              {meta.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    </div>
  )
}
