import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function AboutPage() {
  const { t } = useLang();
  const copy = t.about;

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{copy.label}</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16, maxWidth: '16ch' }}>
            {copy.title}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            {copy.location}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {copy.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}
            >
              {paragraph}
            </p>
          ))}

          <div style={{ display: 'grid', gap: 20, marginTop: 36 }}>
            {copy.points.map((point) => (
              <div key={point.title} style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: 18 }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
                  {point.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.7, fontWeight: 300 }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Link to="/contact" className="btn-gold">{t.common.contactUs}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
