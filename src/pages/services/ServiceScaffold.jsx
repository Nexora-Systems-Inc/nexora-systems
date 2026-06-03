import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './ServiceScaffold.css';

export default function ServiceScaffold({ titleEn, titleFr, subtitleEn, subtitleFr, features, docRef }) {
  const { lang, t } = useLang();
  const title = lang === 'en' ? titleEn : titleFr;
  const subtitle = lang === 'en' ? subtitleEn : subtitleFr;

  return (
    <div className="scaffold-page">
      <section className="page-hero">
        <div className="container">
          {docRef && <p className="section-label">{docRef}</p>}
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {title}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            {subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <p className="section-label">
            {lang === 'en' ? 'What We Offer' : 'Ce que nous offrons'}
          </p>
          <div className="scaffold-features">
            {features.map((f, i) => (
              <div key={i} className="scaffold-feature">
                <div className="scaffold-feature-num">{String(i + 1).padStart(2, '0')}</div>
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
              {lang === 'en'
                ? `Interested in ${titleEn}?`
                : `Intéressé par ${titleFr}?`}
            </h2>
            <p className="scaffold-cta-sub">
              {lang === 'en'
                ? "This page is being expanded. Contact us to discuss your requirements."
                : "Cette page est en cours d'expansion. Contactez-nous pour discuter de vos besoins."}
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
