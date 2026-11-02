import { Icon } from '../ui/Icon'
import { useReveal } from '../../hooks/useReveal'
import './ContentCard.css'

export function ContentCard({ item, variant = 'default' }) {
  const ref = useReveal()

  return (
    <article ref={ref} className={`content-card variant-${variant} reveal`}>
      {item.icon ? (
        <div className="content-card-icon">
          <Icon name={item.icon} />
        </div>
      ) : null}
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      {item.detail ? <p className="content-card-detail">{item.detail}</p> : null}
    </article>
  )
}

export function ContentCardGrid({ items, variant = 'default' }) {
  return (
    <div className={`content-card-grid variant-${variant}`}>
      {items.map((item) => (
        <ContentCard key={item.id} item={item} variant={variant} />
      ))}
    </div>
  )
}
