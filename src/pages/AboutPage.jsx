import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function AboutPage() {
  const { lang, t } = useLang();

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{lang === 'en' ? 'About' : 'À propos'}</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {lang === 'en' ? 'Nexora Systems' : 'Nexora Systems'}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 17, color: 'var(--gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            {t.home.tagline}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p className="section-label">{lang === 'en' ? 'Our Mission' : 'Notre mission'}</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, marginBottom: 28, marginTop: 8, lineHeight: 1.15 }}>
            {lang === 'en'
              ? 'We help businesses grow through intelligent technology.'
              : 'Nous aidons les entreprises à croître grâce à des technologies intelligentes.'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Nexora Systems is a technology solutions company serving businesses across Ontario and Quebec. We design, build, and deploy intelligent systems — from professional websites to AI-powered operations — with a focus on long-term value and real business results.'
              : 'Nexora Systems est une entreprise de solutions technologiques qui sert des entreprises à travers l\'Ontario et le Québec. Nous concevons, construisons et déployons des systèmes intelligents — des sites web professionnels aux opérations propulsées par l\'IA — avec un accent sur la valeur à long terme et les résultats concrets.'}
          </p>
          <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.9, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Every engagement begins with a deep understanding of your business. We don\'t apply templates — we scope, design, and build solutions that fit your specific context, industry, and goals.'
              : 'Chaque engagement commence par une compréhension approfondie de votre entreprise. Nous ne appliquons pas de modèles — nous définissons, concevons et construisons des solutions adaptées à votre contexte, secteur et objectifs spécifiques.'}
          </p>
          <div style={{ marginTop: 48 }}>
            <Link to="/contact" className="btn-gold">{t.common.contactUs}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
