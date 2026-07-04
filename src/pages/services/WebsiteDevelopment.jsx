import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import './WebsiteDevelopment.css';

const PACKAGE_ICONS = {
  standard: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <rect x="2" y="5" width="28" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="2" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="6.5" cy="8.5" r="1.5" fill="currentColor"/>
      <circle cx="11" cy="8.5" r="1.5" fill="currentColor"/>
      <line x1="10" y1="25" x2="10" y2="30" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="22" y1="25" x2="22" y2="30" stroke="currentColor" strokeWidth="1.8"/>
      <line x1="7" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  business: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path d="M4 26L10 10L16 16L22 6L28 26H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  ecommerce: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <path d="M3 5H7L10 20H24L27 10H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="13" cy="26" r="2" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  custom: (
    <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 4V8M16 24V28M4 16H8M24 16H28M7.03 7.03L9.86 9.86M22.14 22.14L24.97 24.97M24.97 7.03L22.14 9.86M9.86 22.14L7.03 24.97" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

const ADDON_ICONS = {
  file: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  layout: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.6"/><line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="1.6"/></svg>,
  'shopping-cart': <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.6"/><circle cx="19" cy="20" r="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
  calendar: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.6"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.6"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.6"/></svg>,
  settings: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.6"/></svg>,
  users: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6"/></svg>,
  refresh: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bot: <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/><path d="M12 8V5M8 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M9 5a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6"/></svg>,
};

function CheckIcon() {
  return (
    <svg className="check-icon" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7.5" stroke="#C9A84C" strokeWidth="1"/>
      <path d="M4.5 8L7 10.5L11.5 5.5" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="x-icon" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7.5" stroke="#999" strokeWidth="1"/>
      <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function WebsiteDevelopment() {
  const { lang, t } = useLang();
  const wd = t.websiteDev;
  const pkg = t.packages;
  const mnt = t.maintenance;
  const cmp = t.comparison;

  const packages = [
    { key: 'standard', data: pkg.standard, accent: false },
    { key: 'business', data: pkg.business, accent: true },
    { key: 'ecommerce', data: pkg.ecommerce, accent: false },
    { key: 'custom', data: pkg.custom, accent: false },
  ];

  const maintenancePlans = [
    { key: 'friendsFamily', data: mnt.friendsFamily },
    { key: 'standard', data: mnt.standard, featured: true },
    { key: 'premium', data: mnt.premium },
  ];

  function renderCell(val) {
    if (val === true) return <CheckIcon />;
    if (val === false) return <span className="table-dash">—</span>;
    return <span className="table-text">{val}</span>;
  }

  return (
    <div className="wd-page">
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <p className="section-label">NXS-006</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {wd.hero}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 16 }}>
            {wd.heroSub}
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 580, lineHeight: 1.75, fontWeight: 300 }}>
            {wd.heroDesc}
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="wd-section">
        <div className="container">
          <p className="section-label">{wd.packagesTitle}</p>
          <div className="packages-grid">
            {packages.map(({ key, data, accent }) => (
              <div key={key} className={`package-card ${accent ? 'package-card--featured' : ''}`}>
                <div className="package-card-header">
                  <div className="package-card-icon">{PACKAGE_ICONS[key]}</div>
                  <h3 className="package-card-name">{data.name}</h3>
                  <span className="package-card-badge">{data.badge}</span>
                </div>
                <div className="package-card-price">
                  {data.price.includes('\n') ? (
                    data.price.split('\n').map((line, i) => (
                      <span key={i} className="package-price-line">{line}</span>
                    ))
                  ) : (
                    <>
                      <span className="package-price-amount">{data.price}</span>
                      <span className="package-price-cad"> CAD</span>
                    </>
                  )}
                </div>
                <div className="package-card-divider" />
                <p className="package-ideal-label">{t.common.idealFor}</p>
                <ul className="package-ideal-list">
                  {data.ideal.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="package-card-divider" />
                <p className="package-includes-label">{t.common.includes}</p>
                <ul className="package-includes-list">
                  {data.includes.map((item, i) => (
                    <li key={i}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="package-card-icon-bottom">{PACKAGE_ICONS[key]}</div>
              </div>
            ))}
          </div>
          <div className="important-note">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20" style={{ flexShrink: 0, color: 'var(--gold)' }}>
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="10" y1="8" x2="10" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="6" r="0.8" fill="currentColor"/>
            </svg>
            <p><strong>
              {lang === 'en' ? 'IMPORTANT NOTE:' : 'NOTE IMPORTANTE :'}</strong>{' '}
              {wd.importantNote}
            </p>
          </div>
        </div>
      </section>

      {/* MIGRATION */}
      <section className="wd-section wd-section--gray">
        <div className="container">
          <p className="section-label">{wd.migrationLabel}</p>
          <h2 className="wd-section-title">{wd.migrationTitle}</h2>
          <p className="wd-migration-desc">{wd.migrationDesc}</p>
        </div>
      </section>

      {/* MAINTENANCE PLANS */}
      <section className="wd-section wd-section--dark">
        <div className="container">
          <p className="section-label">{wd.maintenanceTitle}</p>
          <h2 className="wd-section-title" style={{ color: 'var(--white)' }}>{wd.maintenanceSub}</h2>
          <div className="maintenance-grid">
            {maintenancePlans.map(({ key, data, featured }) => (
              <div key={key} className={`maint-card ${featured ? 'maint-card--featured' : ''}`}>
                {featured && <div className="maint-featured-badge">{lang === 'en' ? 'Most Popular' : 'Plus populaire'}</div>}
                <h3 className="maint-name">{data.name}</h3>
                <div className="maint-price">
                  <span className="maint-price-amount">{data.price}</span>
                  <span className="maint-price-period">{data.period}</span>
                </div>
                <ul className="maint-includes">
                  {data.includes.map((item, i) => (
                    <li key={i}>
                      <CheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="maint-response">
                  <span className="maint-response-label">{lang === 'en' ? 'Response Time:' : 'Délai de réponse :'}</span>
                  <span className="maint-response-val">{data.responseTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="wd-section">
        <div className="container">
          <h2 className="wd-section-title">{wd.comparisonTitle}</h2>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="comparison-th comparison-th--feature">{cmp.feature}</th>
                  <th className="comparison-th">{cmp.friendsFamily}</th>
                  <th className="comparison-th comparison-th--featured">{cmp.standardBusiness}</th>
                  <th className="comparison-th">{cmp.premiumBusiness}</th>
                </tr>
              </thead>
              <tbody>
                {cmp.features.map((row, i) => (
                  <tr key={i} className="comparison-row">
                    <td className="comparison-td comparison-td--feature">{row.name}</td>
                    <td className="comparison-td">{renderCell(row.ff)}</td>
                    <td className="comparison-td comparison-td--featured">{renderCell(row.sb)}</td>
                    <td className="comparison-td">{renderCell(row.pb)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROJECT PRICING */}
      <section className="wd-section wd-section--gray">
        <div className="container">
          <p className="section-label">{wd.pricingTitle}</p>
          <div className="pricing-display">
            <div className="pricing-box">
              <p className="pricing-box-label">{t.pricing.standardLabel}</p>
              <p className="pricing-box-value">{t.pricing.value}</p>
              <p className="pricing-box-sublabel">{lang === 'en' ? 'Professional Website Development' : 'Développement de site web professionnel'}</p>
              <ul className="pricing-box-includes">
                {t.pricing.includes.map((item, i) => (
                  <li key={i}><CheckIcon /><span>{item}</span></li>
                ))}
              </ul>
              <p className="pricing-box-note">{t.pricing.note}</p>
            </div>
            <div className="pricing-minus">−</div>
            <div className="pricing-box pricing-box--discount">
              <p className="pricing-box-label">{t.pricing.discountLabel}</p>
              <p className="pricing-box-discount">{t.pricing.discount}</p>
            </div>
            <div className="pricing-equals">=</div>
            <div className="pricing-box pricing-box--final">
              <p className="pricing-box-label">{t.pricing.finalLabel}</p>
              <p className="pricing-box-final">{t.pricing.final}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="wd-section">
        <div className="container">
          <p className="section-label">{wd.addonsTitle}</p>
          <div className="addons-grid">
            {t.additionalServices.map((addon, i) => (
              <div key={i} className="addon-card">
                <div className="addon-icon">{ADDON_ICONS[addon.icon]}</div>
                <p className="addon-name">{addon.name}</p>
                <p className="addon-price">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTES */}
      <section className="wd-section wd-section--dark">
        <div className="container">
          <p className="section-label">{wd.notesTitle}</p>
          <div className="notes-grid">
            <div className="note-card note-card--green">
              <div className="note-card-icon note-card-icon--green">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h4>{t.notes.included.title}</h4>
              <ul>
                {t.notes.included.items.map((item, i) => (
                  <li key={i}><CheckIcon /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="note-card note-card--red">
              <div className="note-card-icon note-card-icon--red">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
              <h4>{t.notes.notIncluded.title}</h4>
              <ul>
                {t.notes.notIncluded.items.map((item, i) => (
                  <li key={i}><XIcon /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="note-card note-card--gold">
              <div className="note-card-icon note-card-icon--gold">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="1.6"/><path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6"/></svg>
              </div>
              <h4>{t.notes.changeRequests.title}</h4>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginTop: 8 }}>
                {t.notes.changeRequests.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wd-cta">
        <div className="container wd-cta-inner">
          <div>
            <h2 className="wd-cta-title">{wd.ctaTitle}</h2>
            <p className="wd-cta-sub">{wd.ctaSub}</p>
          </div>
          <Link to="/contact" className="btn-gold">{wd.ctaButton}</Link>
        </div>
      </section>
    </div>
  );
}
