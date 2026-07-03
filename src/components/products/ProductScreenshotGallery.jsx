import ProductScreenshot from './ProductScreenshot';
import './ProductScreenshotGallery.css';

export default function ProductScreenshotGallery({ title, screenshots, comingSoonLabel }) {
  return (
    <div className="product-screenshot-gallery">
      {title && <h2 className="product-section-title">{title}</h2>}
      <div className="product-screenshot-gallery-grid">
        {screenshots.map((shot, i) => (
          <ProductScreenshot
            key={shot.id || i}
            caption={shot.caption}
            src={shot.src}
            comingSoonLabel={comingSoonLabel}
          />
        ))}
      </div>
    </div>
  );
}
