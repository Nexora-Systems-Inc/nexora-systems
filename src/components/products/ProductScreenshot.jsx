import './ProductScreenshot.css';

export default function ProductScreenshot({
  caption,
  src,
  comingSoonLabel = 'Coming Soon',
  onOpen,
}) {
  const isInteractive = Boolean(src && onOpen);

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <figure className="product-screenshot">
      <div
        className={`product-screenshot-frame${src ? ' product-screenshot-frame--live' : ' product-screenshot-frame--mock'}${isInteractive ? ' product-screenshot-frame--interactive' : ''}`}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={isInteractive ? onOpen : undefined}
        onKeyDown={handleKeyDown}
        aria-label={isInteractive ? `View ${caption}` : undefined}
      >
        {src ? (
          <img src={src} alt="" className="product-screenshot-image" loading="lazy" />
        ) : (
          <div
            className="product-screenshot-mock"
            role="img"
            aria-label={caption ? `${caption} — ${comingSoonLabel}` : comingSoonLabel}
          >
            <div className="product-screenshot-chrome" aria-hidden="true">
              <div className="product-screenshot-chrome-dots">
                <span /><span /><span />
              </div>
              <div className="product-screenshot-chrome-bar" />
            </div>
            <div className="product-screenshot-mock-body" aria-hidden="true">
              <div className="product-screenshot-mock-sidebar" />
              <div className="product-screenshot-mock-content">
                <div className="product-screenshot-skeleton product-screenshot-skeleton--header" />
                <div className="product-screenshot-skeleton" />
                <div className="product-screenshot-skeleton product-screenshot-skeleton--short" />
                <div className="product-screenshot-skeleton product-screenshot-skeleton--medium" />
              </div>
            </div>
            <span className="product-screenshot-soon-badge">{comingSoonLabel}</span>
          </div>
        )}
        {isInteractive && (
          <span className="product-screenshot-expand-hint" aria-hidden="true">
            View full size
          </span>
        )}
      </div>
      {caption && <figcaption className="product-screenshot-caption">{caption}</figcaption>}
    </figure>
  );
}
