import { useCallback, useEffect, useRef } from 'react';
import './ProductScreenshotLightbox.css';

const SWIPE_THRESHOLD_PX = 48;

export default function ProductScreenshotLightbox({
  screenshots,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  closeLabel,
}) {
  const touchStartX = useRef(null);
  const activeShot = activeIndex != null ? screenshots[activeIndex] : null;

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

  if (activeIndex == null || !activeShot) {
    return null;
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;

    if (delta > 0) {
      onPrev();
    } else {
      onNext();
    }
  };

  return (
    <div
      className="product-screenshot-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={activeShot.caption}
      onClick={onClose}
    >
      <div
        className="product-screenshot-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="product-screenshot-lightbox-close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          ×
        </button>

        <button
          type="button"
          className="product-screenshot-lightbox-nav product-screenshot-lightbox-nav--prev"
          onClick={onPrev}
          aria-label="Previous screenshot"
        >
          ‹
        </button>

        <figure className="product-screenshot-lightbox-figure">
          <img
            src={activeShot.src}
            alt={activeShot.caption}
            className="product-screenshot-lightbox-image"
          />
          <figcaption className="product-screenshot-lightbox-caption">
            {activeShot.caption}
            <span className="product-screenshot-lightbox-counter">
              {activeIndex + 1} / {screenshots.length}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          className="product-screenshot-lightbox-nav product-screenshot-lightbox-nav--next"
          onClick={onNext}
          aria-label="Next screenshot"
        >
          ›
        </button>
      </div>
    </div>
  );
}
