import './ProductVideoEmbed.css';

/**
 * Embeds a product demo video when `embedUrl` is set; otherwise shows a polished coming-soon state.
 * Example: embedUrl="https://www.youtube.com/embed/VIDEO_ID"
 */
export default function ProductVideoEmbed({
  title,
  subtitle,
  embedUrl,
  comingSoonLabel = 'Demo Coming Soon',
  comingSoonDesc,
}) {
  const hasVideo = Boolean(embedUrl);

  return (
    <div className="product-video-embed">
      {title && <h2 className="product-section-title">{title}</h2>}
      <div className={`product-video-container${hasVideo ? ' product-video-container--live' : ''}`}>
        {hasVideo ? (
          <iframe
            src={embedUrl}
            title={title || 'Product demo video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="product-video-coming-soon" role="region" aria-label={comingSoonLabel}>
            <div className="product-video-coming-soon-glow" aria-hidden="true" />
            <span className="product-video-soon-badge">{comingSoonLabel}</span>
            <div className="product-video-play" aria-hidden="true">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <path d="M10 7L26 16L10 25V7Z" fill="currentColor" />
              </svg>
            </div>
            <p className="product-video-coming-soon-title">{comingSoonDesc}</p>
            {subtitle && (
              <p className="product-video-coming-soon-hint">{subtitle}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
