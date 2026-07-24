import { useReveal } from '../../hooks/useReveal'
import './RatingSummary.css'

export function RatingSummary({ ratings }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="rating-summary reveal">
      {ratings.map((rating, index) => (
        <article
          key={rating.platform}
          className={`rating-card reveal-delay-${(index % 3) + 1}`}
        >
          <p className="rating-platform">{rating.platform}</p>
          <p className="rating-score">{rating.scoreLabel}</p>
          {rating.countLabel ? <p className="rating-count">{rating.countLabel}</p> : null}
          <p className="rating-note">{rating.note}</p>
        </article>
      ))}
    </div>
  )
}
