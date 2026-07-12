import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { TEAM_PORTRAITS, TEAM_PORTRAIT_SIZE } from '../config/aboutTeamAssets';
import './AboutPage.css';

const TEAM_META = [
  { id: 'ron', kind: 'human', imageSrc: TEAM_PORTRAITS.ron.src },
  { id: 'ashley', kind: 'ai', imageSrc: TEAM_PORTRAITS.ashley.src },
  { id: 'logan', kind: 'ai', imageSrc: TEAM_PORTRAITS.logan.src },
  { id: 'peter', kind: 'ai', imageSrc: TEAM_PORTRAITS.peter.src },
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

              return (
                <article key={member.id} className="about-team-card">
                  <div className="about-team-portrait">
                    <img
                      src={member.imageSrc}
                      alt={copy.portraitAlt}
                      className="about-team-portrait-img"
                      width={TEAM_PORTRAIT_SIZE.width}
                      height={TEAM_PORTRAIT_SIZE.height}
                      loading="lazy"
                      decoding="async"
                    />
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
