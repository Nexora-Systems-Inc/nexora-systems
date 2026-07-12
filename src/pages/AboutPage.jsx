import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { ASHLEY_ASSETS } from '../config/ashleyAssets';
import './AboutPage.css';

function RonIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M14 52c2.5-10 10-15 18-15s15.5 5 18 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M44 18.5c3.5 1 6 4.2 6 8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M46 40c4.5 1.5 7.5 5 9 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LoganIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 24h24M20 32h18M20 40h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="44" cy="40" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function AtlasIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M22 33.5l6 6 14-14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TEAM_META = [
  { id: 'ron', kind: 'human', Icon: RonIcon },
  { id: 'ashley', kind: 'ai', imageSrc: ASHLEY_ASSETS.gridSrc },
  { id: 'logan', kind: 'ai', Icon: LoganIcon },
  { id: 'atlas', kind: 'ai', Icon: AtlasIcon },
];

export default function AboutPage() {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{a.heroLabel}</p>
          <h1 className="about-hero-title">{a.heroTitle}</h1>
          <div className="gold-divider about-hero-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="about-hero-sub">{a.heroSub}</p>
        </div>
      </section>

      <section className="about-intro">
        <div className="container about-intro-inner">
          <p className="section-label">{a.introLabel}</p>
          <h2 className="about-intro-title">{a.introTitle}</h2>
          <p className="about-intro-body">{a.introBody1}</p>
          <p className="about-intro-body">{a.introBody2}</p>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <div className="about-team-header">
            <p className="section-label">{a.teamLabel}</p>
            <h2 className="about-team-title">{a.teamTitle}</h2>
            <p className="about-team-lead">{a.teamLead}</p>
          </div>

          <div className="about-team-grid">
            {TEAM_META.map((member) => {
              const copy = a.team[member.id];
              const badge = member.kind === 'human' ? a.badgeHuman : a.badgeAi;
              const badgeClass =
                member.kind === 'human'
                  ? 'about-team-badge about-team-badge--human'
                  : 'about-team-badge';
              const Icon = member.Icon;

              return (
                <article key={member.id} className="about-team-card">
                  <div className="about-team-portrait">
                    {member.imageSrc ? (
                      <img
                        src={member.imageSrc}
                        alt={copy.portraitAlt}
                        className="about-team-portrait-img"
                        width={ASHLEY_ASSETS.gridWidth}
                        height={ASHLEY_ASSETS.gridHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="about-team-portrait-placeholder" aria-hidden="true">
                        <Icon />
                      </div>
                    )}
                  </div>
                  <div className="about-team-body">
                    <span className={badgeClass}>{badge}</span>
                    <h3 className="about-team-name">{copy.name}</h3>
                    <p className="about-team-role">{copy.title}</p>
                    <p className="about-team-bio">{copy.bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-human">
        <div className="about-human-glow" aria-hidden="true" />
        <div className="container about-human-inner">
          <p className="section-label">{a.humanLabel}</p>
          <h2 className="about-human-title">{a.humanTitle}</h2>
          <p className="about-human-body">{a.humanBody1}</p>
          <p className="about-human-body">{a.humanBody2}</p>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <h2 className="about-cta-title">{a.ctaTitle}</h2>
            <p className="about-cta-sub">{a.ctaSub}</p>
          </div>
          <Link to="/contact" className="btn-gold">
            {t.common.contactUs}
          </Link>
        </div>
      </section>
    </div>
  );
}
