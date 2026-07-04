import { useCallback, useState } from 'react';
import ProductScreenshot from './ProductScreenshot';
import ProductScreenshotLightbox from './ProductScreenshotLightbox';
import './ProductScreenshotGallery.css';

export default function ProductScreenshotGallery({
  title,
  screenshots,
  comingSoonLabel,
  closeLabel = 'Close',
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const galleryShots = screenshots.filter((shot) => shot.src);

  const openLightbox = useCallback((index) => {
    const shot = screenshots[index];
    if (!shot?.src) return;

    const galleryIndex = galleryShots.findIndex((entry) => entry.id === shot.id);
    if (galleryIndex >= 0) {
      setActiveIndex(galleryIndex);
    }
  }, [galleryShots, screenshots]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null) return current;
      return (current - 1 + galleryShots.length) % galleryShots.length;
    });
  }, [galleryShots.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current == null) return current;
      return (current + 1) % galleryShots.length;
    });
  }, [galleryShots.length]);

  return (
    <div className="product-screenshot-gallery">
      {title && <h2 className="product-section-title">{title}</h2>}
      <div className="product-screenshot-gallery-grid">
        {screenshots.map((shot, index) => (
          <ProductScreenshot
            key={shot.id || index}
            caption={shot.caption}
            src={shot.src}
            comingSoonLabel={comingSoonLabel}
            onOpen={shot.src ? () => openLightbox(index) : undefined}
          />
        ))}
      </div>

      <ProductScreenshotLightbox
        screenshots={galleryShots}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
        closeLabel={closeLabel}
      />
    </div>
  );
}
