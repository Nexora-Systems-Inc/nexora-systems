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
      taglineEn: 'Keep the game honest.',
      taglineFr: 'Que le jeu reste honnête.',
      descEn: 'CribLedger is a companion app for cribbage players who enjoy friendly wagers. Track matches, record wins and losses, maintain running balances between players, and settle up with confidence. Whether it\'s a casual game with friends or an ongoing rivalry, CribLedger keeps score long after the cards are put away.',
      descFr: 'CribLedger est une application compagnon pour les joueurs de cribbage qui aiment les paris amicaux. Suivez les parties, enregistrez victoires et défaites, maintenez des soldes courants entre joueurs et réglez vos comptes en toute confiance. Que ce soit une partie décontractée entre amis ou une rivalité qui dure, CribLedger garde le score longtemps après que les cartes soient rangées.',
      bulletsEn: [
        'Match History',
        'Running Player Balances',
        'Win/Loss Statistics',
        'Friendly Wager Tracking',
        'Simple Settlement History',
      ],
      bulletsFr: [
        'Historique des parties',
        'Soldes courants entre joueurs',
        'Statistiques victoires/défaites',
        'Suivi des paris amicaux',
        'Historique des règlements',
      ],
    },
    {
      titleEn: 'Custom Business Applications',
      titleFr: 'Applications d\'affaires sur mesure',
      taglineEn: 'Built around your business.',
      taglineFr: 'Conçu autour de votre entreprise.',
      descEn: 'Every business has unique workflows that off-the-shelf software can\'t always support. Nexora designs and develops custom business applications tailored to your operations, your team, and your long-term goals. From internal tools and client portals to workflow automation and AI-powered platforms, we build software that fits your business instead of forcing your business to fit the software.',
      descFr: 'Chaque entreprise a des processus uniques que les logiciels prêts à l\'emploi ne supportent pas toujours. Nexora conçoit et développe des applications d\'affaires sur mesure adaptées à vos opérations, votre équipe et vos objectifs à long terme. Des outils internes et portails clients à l\'automatisation des flux et aux plateformes propulsées par l\'IA, nous construisons des logiciels qui s\'adaptent à votre entreprise — pas l\'inverse.',
      bulletsEn: [
        'Custom Workflow Design',
        'Internal Business Tools',
        'Client & Employee Portals',
        'AI-Powered Automation',
        'Cloud & Mobile Applications',
        'Long-Term Partnership',
      ],
      bulletsFr: [
        'Conception de flux sur mesure',
        'Outils internes d\'affaires',
        'Portails clients et employés',
        'Automatisation propulsée par l\'IA',
        'Applications cloud et mobile',
        'Partenariat à long terme',
      ],
      ctaEn: 'Start Your Project',
      ctaFr: 'Démarrer votre projet',
      ctaTo: '/contact',
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
            <div className="web-apps-product-num web-apps-product-num--light">02</div>
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

          <div className="scaffold-features web-apps-ecosystem-more">
            {otherFeatures.map((f, i) => (
              <div key={i} className="scaffold-feature">
                <div className="scaffold-feature-num">{String(i + 3).padStart(2, '0')}</div>
                <div>
                  <h3 className="scaffold-feature-title">{lang === 'en' ? f.titleEn : f.titleFr}</h3>
                  {f.taglineEn && (
                    <p className="scaffold-feature-tagline">
                      {lang === 'en' ? f.taglineEn : f.taglineFr}
                    </p>
                  )}
                  <p className="scaffold-feature-desc">{lang === 'en' ? f.descEn : f.descFr}</p>
                  {f.bulletsEn && (
                    <ul className="scaffold-feature-bullets">
                      {(lang === 'en' ? f.bulletsEn : f.bulletsFr).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {f.ctaEn && (
                    <Link to={f.ctaTo} className="btn-outline-dark scaffold-feature-cta">
                      {lang === 'en' ? f.ctaEn : f.ctaFr}
                    </Link>
                  )}
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
