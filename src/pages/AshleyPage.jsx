import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { ASHLEY_ASSETS } from '../config/ashleyAssets';
import AshleyGreetingAudio from '../components/ashley/AshleyGreetingAudio';
import './AshleyPage.css';

export default function AshleyPage() {
  const { lang } = useLang();
  const copy = lang === 'en'
    ? {
        label: 'Coming Soon',
        title: 'Meet Ashley',
        subtitle: 'Ashley Sterling — Cognitive Interface Agent',
        body: 'Ashley is Nexora\'s AI personality — a cognitive interface agent that brings intelligence into business systems, products, and client experiences. From field assistance in CrewPilot to receptionist workflows, Ashley is how Nexora makes AI practical and approachable. This page will introduce Ashley in full detail as the experience launches.',
        cta: 'Contact Nexora',
      }
    : {
        label: 'Bientôt disponible',
        title: 'Rencontrez Ashley',
        subtitle: 'Ashley Sterling — Agent d\'interface cognitive',
        body: 'Ashley est la personnalité IA de Nexora — une agente d\'interface cognitive qui intègre l\'intelligence aux systèmes d\'affaires, produits et expériences client. Du soutien terrain dans CrewPilot aux flux de réception, Ashley rend l\'IA pratique et accessible. Cette page présentera Ashley en détail au lancement de l\'expérience.',
        cta: 'Contacter Nexora',
      };

  return (
    <div className="ashley-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{copy.label}</p>
          <h1 className="ashley-page-title">{copy.title}</h1>
          <div className="gold-divider ashley-page-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="ashley-page-subtitle">{copy.subtitle}</p>
        </div>
      </section>

      <section className="ashley-page-body">
        <div className="container ashley-page-inner">
          <div className="ashley-page-card-wrap">
            <img
              src={ASHLEY_ASSETS.presentationSrc}
              alt=""
              className="ashley-page-card"
              width={ASHLEY_ASSETS.presentationWidth}
              height={ASHLEY_ASSETS.presentationHeight}
              loading="lazy"
              decoding="async"
            />
            <AshleyGreetingAudio lang={lang} />
          </div>
          <p className="ashley-page-desc">{copy.body}</p>
          <Link to="/contact" className="btn-gold">{copy.cta}</Link>
        </div>
      </section>
    </div>
  );
}
