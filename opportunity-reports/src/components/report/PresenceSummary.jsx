import { useReveal } from '../../hooks/useReveal'
import './PresenceSummary.css'

export function PresenceSummary({ channels, summary }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="presence-summary reveal">
      <p className="presence-overview">{summary}</p>
      <div className="presence-grid">
        {channels.map((channel) => (
          <article key={channel.id} className="presence-item">
            <div className="presence-item-top">
              <h3>{channel.label}</h3>
              <span className={`presence-status status-${slugify(channel.status)}`}>
                {channel.status}
              </span>
            </div>
            <p>{channel.summary}</p>
            {channel.url ? (
              <a href={channel.url} target="_blank" rel="noreferrer">
                Visit public page
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
