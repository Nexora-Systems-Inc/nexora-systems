import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import ProductSpotlight from '../../components/products/ProductSpotlight';
import './ServiceScaffold.css';

export default function WebApplicationsPage() {
  const { lang, t } = useLang();
  const cp = t.products.crewpilot;
  const spotlight = cp.spotlight;

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
    <div className="scaffold-page">
      <section className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {lang === 'en' ? 'Web Applications' : 'Applications Web'}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            {lang === 'en'
              ? 'Purpose-Built Tools for Modern Business Operations'
              : 'Outils sur mesure pour les opérations d\'affaires modernes'}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <p className="section-label">{t.webApplications.spotlightLabel}</p>
          <ProductSpotlight
            badge={spotlight.badge}
            name={cp.name}
            logoSrc={cp.logoSrc}
            tagline={spotlight.tagline}
            description={spotlight.description}
            highlights={spotlight.highlights}
            ctaLabel={t.products.common.seeDemo}
            ctaTo="/products/crewpilot"
          />

          <p className="section-label" style={{ marginTop: 16 }}>
            {t.products.common.moreProducts}
          </p>
          <div className="scaffold-features">
            {otherFeatures.map((f, i) => (
              <div key={i} className="scaffold-feature">
                <div className="scaffold-feature-num">{String(i + 2).padStart(2, '0')}</div>
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
