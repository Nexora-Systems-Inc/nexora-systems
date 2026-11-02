import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { WORK_ITEMS, workBySection } from '../config/work';
import ProductScreenshotLightbox from '../components/products/ProductScreenshotLightbox';
import './WorkPage.css';

function WorkCard({ item, copy, onOpen, visitLabel, soonLabel }) {
  const lead = item.shots[0];
  const phone = item.shots.find((shot) => shot.id === 'mobile');
  const showPhone = phone && lead.id !== 'mobile';

  return (
    <article id={item.id} className="work-card">
      <button
        type="button"
        className={`work-card-media${item.fit === 'contain' ? ' work-card-media--contain' : ''}${showPhone ? ' work-card-media--phone' : ''}`}
        onClick={() => onOpen(item.id, 0)}
      >
        <img
          src={lead.src}
          alt={copy.alt}
          className="work-card-shot"
          width={1440}
          height={900}
        />
        {showPhone ? (
          <img
            src={phone.src}
            alt=""
            className="work-card-phone"
            width={390}
            height={844}
          />
        ) : null}
        {item.comingSoon ? <span className="work-card-badge">{soonLabel}</span> : null}
      </button>

      <div className="work-card-body">
        <h3 className="work-card-name">{copy.name}</h3>
        <p className="work-card-desc">{copy.desc}</p>
        <ul className="work-card-tags">
          {copy.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="work-card-actions">
          <button type="button" className="work-card-enlarge" onClick={() => onOpen(item.id, 0)}>
            {copy.enlarge}
          </button>
          {item.url ? (
            <a
              className="work-card-visit"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {visitLabel}
            </a>
          ) : null}
          {item.comingSoon ? <span className="work-card-soon">{soonLabel}</span> : null}
        </div>
      </div>
    </article>
  );
}

export default function WorkPage() {
  const { t } = useLang();
  const location = useLocation();
  const copy = t.work;
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);

  const activeItem = active ? WORK_ITEMS.find((item) => item.id === active.id) : null;
  const activeCopy = activeItem ? copy.items[activeItem.key] : null;
  const lightboxShots = activeItem
    ? activeItem.shots.map((shot) => ({
      src: shot.src,
      caption: activeCopy.captions[shot.id],
    }))
    : [];

  function openGallery(id, index) {
    setActive({ id, index });
  }

  function closeGallery() {
    setActive(null);
  }

  function step(delta) {
    setActive((current) => {
      if (!current) return current;
      const item = WORK_ITEMS.find((entry) => entry.id === current.id);
      if (!item) return current;
      const count = item.shots.length;
      return { id: current.id, index: (current.index + delta + count) % count };
    });
  }

  return (
    <div className="work-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{copy.label}</p>
          <h1 className="work-hero-title">{copy.title}</h1>
          <div className="gold-divider" style={{ margin: '16px 0 20px', maxWidth: 420 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p className="work-hero-desc">{copy.intro}</p>
        </div>
      </section>

      <section className="work-section">
        <div className="container">
          <p className="section-label">{copy.websitesLabel}</p>
          <h2 className="work-section-title">{copy.websitesTitle}</h2>
          <div className="work-grid">
            {workBySection('websites').map((item) => (
              <WorkCard
                key={item.id}
                item={item}
                copy={copy.items[item.key]}
                onOpen={openGallery}
                visitLabel={copy.visit}
                soonLabel={copy.comingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="work-section work-section--soft">
        <div className="container">
          <p className="section-label">{copy.softwareLabel}</p>
          <h2 className="work-section-title">{copy.softwareTitle}</h2>
          <p className="work-section-lead">{copy.softwareLead}</p>
          <div className="work-grid">
            {workBySection('software').map((item) => (
              <WorkCard
                key={item.id}
                item={item}
                copy={copy.items[item.key]}
                onOpen={openGallery}
                visitLabel={copy.visit}
                soonLabel={copy.comingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductScreenshotLightbox
        screenshots={lightboxShots}
        activeIndex={active ? active.index : null}
        onClose={closeGallery}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        closeLabel={copy.closeGallery}
        prevLabel={copy.prev}
        nextLabel={copy.next}
      />
    </div>
  );
}
