import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { PRODUCT_FEATURE_ICONS } from '../../components/products/productFeatureIcons';
import './ServiceScaffold.css';
import './WebApplications.css';

export default function WebApplicationsPage() {
  const { lang, t } = useLang();
  const wa = t.webApplications;
  const cp = t.products.crewpilot;
  const accord = t.products.accord;
  const common = t.products.common;
  const spotlight = cp.spotlight;
  const demoUrl = '/contact?product=crewpilot&intent=demo';

  return (
    <div className="scaffold-page web-apps-page">
      <section className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {lang === 'en' ? 'Web Applications' : 'Applications Web'}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 16 }}>
            {wa.heroSub}
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 640, lineHeight: 1.75, fontWeight: 300 }}>
            {wa.heroDesc}
          </p>
        </div>
      </section>

      <section className="web-apps-flagship">
        <div className="web-apps-flagship-glow" aria-hidden="true" />
        <div className="container">
          <div className="web-apps-flagship-row">
            <div className="web-apps-product-num">01</div>
            <div className="web-apps-flagship-header">
              <p className="section-label">{wa.spotlightLabel}</p>
              <div className="web-apps-flagship-brand">
                <img src={cp.logoSrc} alt="" className="web-apps-flagship-logo" />
                <div>
                  <h2 className="web-apps-flagship-name">{cp.name}</h2>
                  <p className="web-apps-flagship-tagline">{spotlight.tagline}</p>
                </div>
              </div>
              <p className="web-apps-flagship-built">{cp.builtBy}</p>
              <p className="web-apps-flagship-desc">{cp.heroDesc}</p>
            </div>
          </div>

          <div className="web-apps-features-grid">
            {cp.features.map((feature) => (
              <article key={feature.key} className="web-apps-feature-card">
                <div className="web-apps-feature-icon">{PRODUCT_FEATURE_ICONS[feature.key]}</div>
                <h3 className="web-apps-feature-title">{feature.title}</h3>
                <p className="web-apps-feature-desc">{feature.desc}</p>
              </article>
            ))}
          </div>

          <div className="web-apps-flagship-ctas">
            <Link to="/products/crewpilot" className="btn-gold">{wa.exploreCta}</Link>
            <Link to={demoUrl} className="btn-outline">{common.bookDemo}</Link>
          </div>

          <div className="web-apps-bridge">
            <p className="section-label">{wa.bridgeLabel}</p>
            <h2 className="web-apps-bridge-title">{wa.positioningTitle}</h2>
            <p className="web-apps-bridge-text">{wa.positioningText}</p>
          </div>
        </div>
      </section>

      <section className="web-apps-ecosystem" aria-labelledby="ecosystem-heading">
        <div className="container">
          <p id="ecosystem-heading" className="section-label">{wa.ecosystemLabel}</p>

          <div className="web-apps-ecosystem-row">
            <article className="web-apps-upcoming-card" aria-labelledby="accord-heading">
              <p className="section-label">{accord.badge}</p>
              <div className="web-apps-upcoming-brand">
                <img src={accord.logoSrc} alt="" className="web-apps-upcoming-logo" />
                <div>
                  <h2 id="accord-heading" className="web-apps-upcoming-name">{accord.name}</h2>
                  <p className="web-apps-upcoming-tagline">{accord.tagline}</p>
                </div>
              </div>
              <p className="web-apps-upcoming-built">{accord.builtBy}</p>
              <p className="web-apps-upcoming-desc">{accord.description}</p>
              <ul className="web-apps-upcoming-badges">
                {accord.badges.map((badge) => (
                  <li key={badge} className="web-apps-upcoming-badge">
                    <span className="web-apps-upcoming-badge-check" aria-hidden="true">✓</span>
                    {badge}
                  </li>
                ))}
              </ul>
              <button type="button" className="web-apps-coming-soon-btn" disabled aria-disabled="true">
                {t.common.comingSoon}
              </button>
            </article>
          </div>

          <div className="web-apps-portfolio">
            <p className="section-label">{wa.portfolioLabel}</p>
            <div className="web-apps-portfolio-item">
              <span className="web-apps-portfolio-mark" aria-hidden="true">CL</span>
              <div className="web-apps-portfolio-copy">
                <h3 className="web-apps-portfolio-name">CribLedger</h3>
                <p className="web-apps-portfolio-tagline">{wa.cribLedgerTagline}</p>
              </div>
              <span className="web-apps-portfolio-more">
                {lang === 'en' ? 'Learn more' : 'En savoir plus'}
                <span className="web-apps-portfolio-arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="web-apps-closing" aria-labelledby="closing-heading">
        <div className="web-apps-closing-glow" aria-hidden="true" />
        <div className="container web-apps-closing-inner">
          <h2 id="closing-heading" className="web-apps-closing-title">{wa.closingTitle}</h2>
          <div className="gold-divider web-apps-closing-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="web-apps-closing-lead">{wa.closingLead}</p>
          <p className="web-apps-closing-text">{wa.closingBody1}</p>
          <p className="web-apps-closing-text">{wa.closingBody2}</p>
          <Link to="/contact" className="btn-gold web-apps-closing-cta">{wa.closingCta}</Link>
        </div>
      </section>

      <section className="scaffold-cta">
        <div className="container scaffold-cta-inner">
          <div>
            <h2 className="scaffold-cta-title">
              {lang === 'en' ? 'Interested in Web Applications?' : 'Intéressé par les applications web?'}
            </h2>
            <p className="scaffold-cta-sub">
              {lang === 'en'
                ? 'From flagship platforms to custom business systems — contact us to discuss your requirements.'
                : 'Des plateformes phares aux systèmes d\'affaires sur mesure — contactez-nous pour discuter de vos besoins.'}
            </p>
          </div>
          <Link to="/contact" className="btn-gold">
            {t.common.contactUs}
          </Link>
        </div>
      </section>
    </div>
  );
}
