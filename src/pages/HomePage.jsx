import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { SERVICE_NAV_ORDER, SERVICE_PATHS } from '../config/services';
import HomeFlagshipSection from '../components/home/HomeFlagshipSection';
import './HomePage.css';

const SERVICES_SECTION_ID = 'services';
const FLAGSHIP_SECTION_ID = 'flagship';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const SERVICE_CARDS = {
  webApps: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="3" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="15" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: { title: 'Web Applications', desc: 'Custom web applications scoped to your workflows — from industry platforms to enterprise tools built with production-grade engineering.' },
    fr: { title: 'Applications Web', desc: 'Applications web sur mesure adaptées à vos processus — des plateformes sectorielles aux outils d\'entreprise conçus avec une ingénierie de niveau production.' },
  },
  aiReceptionists: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 24C4 19.582 8.477 16 14 16C19.523 16 24 19.582 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 20L21 22L25 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    en: { title: 'AI Receptionists', desc: 'Meet Ashley — your 24/7 AI receptionist handling SMS booking, voice intake, appointment scheduling, and customer support.' },
    fr: { title: 'Réceptionnistes IA', desc: 'Rencontrez Ashley — votre réceptionniste IA disponible 24h/7j pour les réservations SMS, la gestion vocale et le service client.' },
  },
  workflow: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <circle cx="6" cy="14" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="22" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="9" y1="13" x2="19" y2="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="9" y1="15" x2="19" y2="20.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: { title: 'Workflow Automation', desc: 'Automate scheduling, lead management, reporting, and notifications — so your team focuses on work that actually moves the needle.' },
    fr: { title: 'Automatisation', desc: 'Automatisez la planification, la gestion des prospects, les rapports et les notifications — pour que votre équipe se concentre sur ce qui compte.' },
  },
  aiConstruction: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M4 22L10 10L16 16L20 8L24 22H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: { title: 'AI Construction', desc: 'AI-powered estimating, drawing analysis, quantity takeoffs, and project tracking for construction professionals.' },
    fr: { title: 'IA Construction', desc: 'Estimation, analyse de plans, métré et suivi de projets propulsés par l\'IA pour les professionnels de la construction.' },
  },
  websiteDev: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <rect x="2" y="5" width="24" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="2" y1="10" x2="26" y2="10" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="9" y1="22" x2="9" y2="26" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="19" y1="22" x2="19" y2="26" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="6" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: { title: 'Website Development', desc: 'Professional websites from elegant single-page presences to full e-commerce platforms — built for performance and growth.' },
    fr: { title: 'Développement Web', desc: 'Sites web professionnels, des vitrines élégantes aux plateformes transactionnelles — conçus pour la performance et la croissance.' },
  },
  customSolutions: {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M14 3L25 9V19L14 25L3 19V9L14 3Z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    en: { title: 'Custom Solutions', desc: 'Your business has unique requirements. We scope, design, and build exactly what you need — with precision and long-term maintainability in mind.' },
    fr: { title: 'Solutions sur mesure', desc: 'Votre entreprise a des besoins uniques. Nous concevons et construisons exactement ce qu\'il vous faut — avec précision et pérennité.' },
  },
};

const SERVICES = SERVICE_NAV_ORDER.map((key) => ({
  key,
  path: SERVICE_PATHS[key],
  ...SERVICE_CARDS[key],
}));

const VALUE_PROPS = [
  {
    icon: '→',
    en: { title: 'Turn interest into real revenue', desc: 'Capture every inquiry, qualify leads instantly, and move opportunities forward automatically — so nothing slips through.' },
    fr: { title: 'Convertissez l\'intérêt en revenus réels', desc: 'Capturez chaque demande, qualifiez les prospects instantanément et faites avancer les opportunités automatiquement.' },
  },
  {
    icon: '⚡',
    en: { title: 'Respond instantly, every time', desc: 'Engage clients with fast, consistent communication powered by AI — handling inquiries, bookings, and follow-ups without delays.' },
    fr: { title: 'Répondez instantanément, à chaque fois', desc: 'Engagez vos clients avec une communication rapide et constante propulsée par l\'IA — sans délai, sans exception.' },
  },
  {
    icon: '◆',
    en: { title: 'Grow without growing overhead', desc: 'Automate your internal workflows and daily operations — increasing capacity, reducing manual work, keeping your business smooth.' },
    fr: { title: 'Croissez sans alourdir vos coûts', desc: 'Automatisez vos processus internes et opérations quotidiennes — augmentez votre capacité, réduisez le travail manuel.' },
  },
];

export default function HomePage() {
  const { lang, t } = useLang();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === `#${SERVICES_SECTION_ID}`) {
      requestAnimationFrame(() => scrollToSection(SERVICES_SECTION_ID));
    }
    if (location.hash === `#${FLAGSHIP_SECTION_ID}`) {
      requestAnimationFrame(() => scrollToSection(FLAGSHIP_SECTION_ID));
    }
  }, [location.pathname, location.hash]);

  function handleServicesCtaClick(e) {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(SERVICES_SECTION_ID);
    }
  }

  function handleFlagshipCtaClick(e) {
    if (location.pathname === '/') {
      e.preventDefault();
      scrollToSection(FLAGSHIP_SECTION_ID);
    }
  }

  return (
    <div className="homepage">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-bg-n" aria-hidden>N</div>
        <div className="container home-hero-inner">
          <div className="home-hero-content">
            <p className="section-label">{t.home.tagline}</p>
            <h1 className="home-hero-title">
              {t.home.hero.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.home.hero.split('\n').length - 1 && <br />}</span>
              ))}
            </h1>
            <div className="gold-divider" style={{ margin: '20px 0 24px' }}>
              <div className="gold-divider-diamond" />
            </div>
            <p className="home-hero-sub">{t.home.heroSub}</p>
            <div className="home-hero-ctas">
              <Link to="/#flagship" className="btn-gold" onClick={handleFlagshipCtaClick}>{t.home.ctaPrimary}</Link>
              <Link to="/#services" className="btn-outline" onClick={handleServicesCtaClick}>{t.home.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <HomeFlagshipSection />

      {/* SERVICES GRID */}
      <section id={SERVICES_SECTION_ID} className="home-services">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>{t.home.servicesTitle}</p>
          <p className="home-services-sub">{t.home.servicesSub}</p>
          <div className="home-services-grid">
            {SERVICES.map(s => (
              <Link key={s.key} to={s.path} className="service-card">
                <div className="service-card-icon">{s.icon}</div>
                <h3 className="service-card-title">{s[lang].title}</h3>
                <p className="service-card-desc">{s[lang].desc}</p>
                <span className="service-card-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NEXORA */}
      <section className="home-values">
        <div className="container">
          <p className="section-label">{t.home.valuesTitle}</p>
          <h2 className="home-values-title">{t.home.valuesSub}</h2>
          <div className="home-values-list">
            {VALUE_PROPS.map((v, i) => (
              <div key={i} className="value-row">
                <div className="value-icon-box">{v.icon}</div>
                <div>
                  <h3 className="value-title">{v[lang].title}</h3>
                  <p className="value-desc">{v[lang].desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="home-cta-band">
        <div className="container home-cta-inner">
          <div>
            <h2 className="home-cta-title">{t.home.ctaTitle}</h2>
            <p className="home-cta-sub">{t.home.ctaSub}</p>
          </div>
          <Link to="/contact" className="btn-gold">{t.common.contactUs}</Link>
        </div>
      </section>
    </div>
  );
}
