import { useReveal } from '../../hooks/useReveal'
import { Icon } from '../ui/Icon'
import './ImpactBlock.css'

export function ImpactBlock({ items }) {
  const ref = useReveal()

  return (
    <div ref={ref} className="impact-block reveal">
      {items.map((item) => (
        <article key={item.id} className="impact-item">
          <div className="impact-icon">
            <Icon name="check" size={18} />
          </div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
