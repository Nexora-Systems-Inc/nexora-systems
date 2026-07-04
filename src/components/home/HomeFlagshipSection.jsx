import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './HomeFlagshipSection.css';

export default function HomeFlagshipSection() {
  const { t } = useLang();
  const f = t.home.flagship;
  const demoUrl = '/contact?product=crewpilot&intent=demo';

  return (
    <section id="flagship" className="home-flagship" aria-labelledby="flagship-heading">
      <div className="container">
        <div className="home-flagship-header">
          <p className="section-label">{f.label}</p>
          <h2 id="flagship-heading" className="home-flagship-name">{f.headline}</h2>
          <p className="home-flagship-tagline">{f.tagline}</p>
          <p className="home-flagship-attribution">{f.attribution}</p>
        </div>

        <div className="home-flagship-showcase">
          <div className="home-flagship-showcase-glow" aria-hidden="true" />
          <figure className="home-flagship-tablet">
            <img
              src={f.showcaseSrc}
              alt={f.showcaseAlt}
              className="home-flagship-tablet-image"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        <ul className="home-flagship-badges">
          {f.badges.map((badge) => (
            <li key={badge} className="home-flagship-badge">
              <span className="home-flagship-badge-check" aria-hidden="true">✓</span>
              {badge}
            </li>
          ))}
        </ul>

        <div className="home-flagship-ctas">
          <Link to="/products/crewpilot" className="btn-gold">{f.exploreCta}</Link>
          <Link to={demoUrl} className="btn-outline-dark">{f.demoCta}</Link>
        </div>
      </div>
    </section>
  );
}
