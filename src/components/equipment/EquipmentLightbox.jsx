import { useCallback, useEffect, useRef } from 'react';
import './EquipmentLightbox.css';

const SWIPE_THRESHOLD_PX = 48;

export default function EquipmentLightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  title,
}) {
  const touchStartX = useRef(null);
  const active = activeIndex != null ? images[activeIndex] : null;

  const handleKeyDown = useCallback(
    (event) => {
      if (activeIndex == null) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    },
    [activeIndex, onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (activeIndex == null) return undefined;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  if (activeIndex == null || !active) return null;

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta > 0) onPrev();
    else onNext();
  };

  return (
    <div
      className="eq-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title || active.caption}
      onClick={onClose}
    >
      <div
        className="eq-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button type="button" className="eq-lightbox-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {images.length > 1 ? (
          <>
            <button type="button" className="eq-lightbox-nav eq-lightbox-nav--prev" onClick={onPrev} aria-label="Previous photo">
              ‹
            </button>
            <button type="button" className="eq-lightbox-nav eq-lightbox-nav--next" onClick={onNext} aria-label="Next photo">
              ›
            </button>
          </>
        ) : null}
        <figure className="eq-lightbox-figure">
          <img src={active.src} alt={active.alt} className="eq-lightbox-image" />
          <figcaption className="eq-lightbox-caption">
            {active.caption}
            <span className="eq-lightbox-counter">
              {activeIndex + 1} / {images.length}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
