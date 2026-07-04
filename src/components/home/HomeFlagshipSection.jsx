import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './HomeFlagshipSection.css';

export default function HomeFlagshipSection() {
  const { t } = useLang();
  const f = t.home.flagship;
  const cp = t.products.crewpilot;
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
          <div className="home-flagship-showcase-frame">
            <div className="home-flagship-showcase-bar">
              <span className="home-flagship-showcase-dot" />
              <span className="home-flagship-showcase-dot" />
              <span className="home-flagship-showcase-dot" />
              <span className="home-flagship-showcase-url">app.nexorasystems.ca</span>
            </div>
            <div className="home-flagship-showcase-body">
              <div className="home-flagship-showcase-sidebar">
                <img src={cp.logoSrc} alt="" className="home-flagship-showcase-logo" />
                <div className="home-flagship-showcase-nav-item home-flagship-showcase-nav-item--active" />
                <div className="home-flagship-showcase-nav-item" />
                <div className="home-flagship-showcase-nav-item" />
                <div className="home-flagship-showcase-nav-item" />
              </div>
              <div className="home-flagship-showcase-main">
                <div className="home-flagship-showcase-stats">
                  <div className="home-flagship-stat">
                    <span className="home-flagship-stat-label">{f.showcase.activeCrews}</span>
                    <span className="home-flagship-stat-value">12</span>
                  </div>
                  <div className="home-flagship-stat">
                    <span className="home-flagship-stat-label">{f.showcase.hoursToday}</span>
                    <span className="home-flagship-stat-value">847</span>
                  </div>
                  <div className="home-flagship-stat">
                    <span className="home-flagship-stat-label">{f.showcase.projects}</span>
                    <span className="home-flagship-stat-value">34</span>
                  </div>
                </div>
                <div className="home-flagship-showcase-grid">
                  <div className="home-flagship-showcase-panel home-flagship-showcase-panel--wide" />
                  <div className="home-flagship-showcase-panel" />
                  <div className="home-flagship-showcase-panel" />
                </div>
              </div>
            </div>
          </div>
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
