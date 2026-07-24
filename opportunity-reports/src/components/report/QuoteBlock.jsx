import { useReveal } from '../../hooks/useReveal'
import './QuoteBlock.css'

export function QuoteBlock({ quotes }) {
  const ref = useReveal()
  if (!quotes?.length) return null

  return (
    <div ref={ref} className="quote-block reveal">
      {quotes.map((quote) => (
        <figure key={quote.id} className="quote-item">
          <blockquote>“{quote.text}”</blockquote>
          <figcaption>
            <span>{quote.attribution}</span>
            {quote.source ? <span className="quote-source">{quote.source}</span> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
