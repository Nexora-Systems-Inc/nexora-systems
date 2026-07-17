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
              ? 'We design and engineer business systems that help companies work smarter.'
              : 'Nous concevons et développons des systèmes d\'affaires qui aident les entreprises à travailler plus intelligemment.'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Nexora Systems serves businesses across Ontario and Quebec. We design and engineer complete business systems — custom websites, progressive web apps, automation, AI assistants, and operational software. CrewPilot is proof of that capability: production workforce management built to grow with the businesses that depend on it.'
              : 'Nexora Systems sert des entreprises à travers l\'Ontario et le Québec. Nous concevons et développons des systèmes d\'affaires complets — sites web, applications web progressives, automatisation, assistants IA et logiciels opérationnels. CrewPilot en est la preuve : une gestion de la main-d\'œuvre en production conçue pour évoluer avec les entreprises qui en dépendent.'}
          </p>
          <p style={{ fontSize: 16, color: 'var(--gray-500)', lineHeight: 1.9, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Every engagement begins with a deep understanding of how your business operates. We don\'t apply templates — we scope, design, and build systems that fit your specific context, industry, and goals.'
              : 'Chaque engagement commence par une compréhension approfondie de vos opérations. Nous n\'appliquons pas de modèles — nous définissons, concevons et construisons des systèmes adaptés à votre contexte, secteur et objectifs spécifiques.'}
          </p>
          <div style={{ marginTop: 48 }}>
            <Link to="/contact" className="btn-gold">{t.common.contactUs}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
