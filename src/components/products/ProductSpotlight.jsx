import { Link } from 'react-router-dom';
import './ProductSpotlight.css';

export default function ProductSpotlight({
  badge,
  name,
  logoInitials,
  logoSrc,
  tagline,
  description,
  highlights = [],
  ctaLabel,
  ctaTo,
}) {
  const initials = logoInitials || name.slice(0, 2).toUpperCase();
  const hasLogo = Boolean(logoSrc);

  return (
    <article className="product-spotlight">
      <div className="product-spotlight-badge">{badge}</div>
      <div className="product-spotlight-body">
        <div className="product-spotlight-content">
          <div className="product-spotlight-brand">
            <span className={`product-spotlight-logo${hasLogo ? ' product-spotlight-logo--image' : ''}`} aria-hidden="true">
              {hasLogo ? (
                <img src={logoSrc} alt="" className="product-spotlight-logo-image" />
              ) : (
                initials
              )}
            </span>
            <div>
              <h3 className="product-spotlight-name">{name}</h3>
              <p className="product-spotlight-tagline">{tagline}</p>
            </div>
          </div>
          <p className="product-spotlight-desc">{description}</p>
          {highlights.length > 0 && (
            <ul className="product-spotlight-highlights">
              {highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="product-spotlight-cta">
          <Link to={ctaTo} className="btn-gold">{ctaLabel}</Link>
        </div>
      </div>
    </article>
  );
}
