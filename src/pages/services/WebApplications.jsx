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

  const otherFeatures = [
    {
      titleEn: 'CribLedger',
      titleFr: 'CribLedger',
      descEn: 'A property management application designed for landlords and property managers. Track leases, manage maintenance requests, automate rent collection reminders, and maintain clear financial records.',
      descFr: 'Une application de gestion immobilière conçue pour les propriétaires. Suivez les baux, gérez les demandes d\'entretien et automatisez les rappels de loyer.',
    },
    {
      titleEn: 'Custom Business Applications',
      titleFr: 'Applications d\'affaires sur mesure',
      descEn: 'Not every business fits an off-the-shelf solution. We design and build custom web applications scoped specifically to your workflows, team structure, and long-term goals.',
      descFr: 'Toutes les entreprises ne correspondent pas à une solution prête à l\'emploi. Nous concevons des applications sur mesure adaptées à vos processus et objectifs à long terme.',
    },
  ];

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
            <p className="web-apps-flagship-positioning">{cp.positioning}</p>
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
        </div>
      </section>

      <section className="web-apps-positioning">
        <div className="container">
          <p className="section-label">{common.productOverview}</p>
          <h2 className="web-apps-positioning-title">{wa.positioningTitle}</h2>
          <p className="web-apps-positioning-text">{wa.positioningText}</p>
        </div>
      </section>

      <section className="web-apps-upcoming" aria-labelledby="accord-heading">
        <div className="container">
          <div className="web-apps-upcoming-row">
            <div className="web-apps-product-num web-apps-product-num--light">02</div>
            <article className="web-apps-upcoming-card">
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
        </div>
      </section>

      <section className="web-apps-secondary">
        <div className="container">
          <p className="section-label">{common.moreProducts}</p>
          <div className="scaffold-features">
            {otherFeatures.map((f, i) => (
              <div key={i} className="scaffold-feature">
                <div className="scaffold-feature-num">{String(i + 3).padStart(2, '0')}</div>
                <div>
                  <h3 className="scaffold-feature-title">{lang === 'en' ? f.titleEn : f.titleFr}</h3>
                  <p className="scaffold-feature-desc">{lang === 'en' ? f.descEn : f.descFr}</p>
                </div>
              </div>
            ))}
          </div>
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
                ? 'From flagship products to custom builds — contact us to discuss your requirements.'
                : 'Des produits phares aux solutions sur mesure — contactez-nous pour discuter de vos besoins.'}
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
