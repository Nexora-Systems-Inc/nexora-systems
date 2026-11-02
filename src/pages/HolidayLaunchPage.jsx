import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './HolidayLaunchPage.css';

export default function HolidayLaunchPage() {
  const { t } = useLang();
  const copy = t.holiday;

  return (
    <div className="holiday-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{copy.label}</p>
          <h1 className="holiday-hero-title">{copy.title}</h1>
          <div className="gold-divider" style={{ margin: '16px 0 20px', maxWidth: 420 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p className="holiday-hero-desc">{copy.intro}</p>
        </div>
      </section>

      <section className="holiday-section">
        <div className="container holiday-layout">
          <article className="holiday-offer">
            <p className="holiday-price-label">{copy.priceLabel}</p>
            <p className="holiday-price">{copy.price}</p>
            <p className="holiday-price-note">{copy.priceNote}</p>
            <p className="holiday-until">{copy.until}</p>
            <Link to="/contact?intent=holiday" className="btn-gold holiday-cta">
              {copy.cta}
            </Link>
            <p className="holiday-cta-note">{copy.ctaNote}</p>
          </article>

          <div className="holiday-details">
            <h2 className="holiday-details-title">{copy.includesTitle}</h2>
            <ul className="holiday-includes">
              {copy.includes.map((item) => (
                <li key={item.title}>
                  <span className="check-gold" aria-hidden="true">✓</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="holiday-upsell">
              <p className="section-label">{copy.upsellLabel}</p>
              <h3>{copy.upsellTitle}</h3>
              <p>{copy.upsellBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="holiday-section holiday-section--soft">
        <div className="container holiday-plain">
          <h2>{copy.fitTitle}</h2>
          <p>{copy.fitBody}</p>
          <p>
            {copy.moreBody}{' '}
            <Link to="/services/website-development">{copy.moreLink}</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
