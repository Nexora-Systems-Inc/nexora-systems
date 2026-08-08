import { useCallback, useState } from 'react';
import EquipmentLightbox from './EquipmentLightbox';
import './EquipmentGallery.css';

export default function EquipmentGallery({ images, title = 'Photography' }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const available = images.filter((img) => img.src);
  const showPlaceholders = available.length === 0;

  const openLightbox = useCallback(
    (index) => {
      if (!available[index]) return;
      setActiveIndex(index);
    },
    [available],
  );

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null || !available.length) return current;
      return (current - 1 + available.length) % available.length;
    });
  }, [available.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null || !available.length) return current;
      return (current + 1) % available.length;
    });
  }, [available.length]);

  return (
    <div className="eq-gallery">
      {showPlaceholders ? (
        <>
          <p className="eq-gallery-note">
            Machine photography is being prepared for this listing. Gallery slots below indicate the views to be published — images will not be altered in ways that misrepresent condition.
          </p>
          <div className="eq-gallery-grid">
            {images.map((img) => (
              <figure key={img.id} className="eq-gallery-item eq-gallery-item--placeholder">
                <div className="eq-gallery-placeholder" aria-hidden="true">
                  <span className="eq-gallery-placeholder-mark">N</span>
                  <span className="eq-gallery-placeholder-label">Photo pending</span>
                </div>
                <figcaption className="eq-gallery-caption">
                  {img.caption}
                  {img.required ? <span className="eq-gallery-required"> Required</span> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      ) : (
        <div className="eq-gallery-grid">
          {available.map((img, index) => (
            <button
              key={img.id}
              type="button"
              className="eq-gallery-item eq-gallery-item--button"
              onClick={() => openLightbox(index)}
              aria-label={`Open photo: ${img.caption}`}
            >
              <img src={img.src} alt={img.alt} className="eq-gallery-image" loading="lazy" />
              <span className="eq-gallery-caption">{img.caption}</span>
            </button>
          ))}
        </div>
      )}

      <EquipmentLightbox
        images={available}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
        title={title}
      />
    </div>
  );
}
