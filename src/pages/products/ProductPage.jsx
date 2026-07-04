import { useLang } from '../../context/LangContext';
import { getProductLaunchConfig } from '../../config/products';
import { PRODUCT_FEATURE_ICONS } from '../../components/products/productFeatureIcons';
import ProductCtaButtons from '../../components/products/ProductCtaButtons';
import ProductScreenshotGallery from '../../components/products/ProductScreenshotGallery';
import ProductVideoEmbed from '../../components/products/ProductVideoEmbed';
import './ProductPage.css';

export default function ProductPage({ productKey }) {
  const { t } = useLang();
  const common = t.products.common;
  const product = t.products[productKey];
  const launch = getProductLaunchConfig(productKey);
  const logoInitials = product.logoInitials || product.name.slice(0, 2).toUpperCase();
  const contactProductUrl = `/contact?product=${productKey}&intent=demo`;
  const hasLogo = Boolean(product.logoSrc);

  return (
    <div className="product-page">
      <section className="page-hero product-hero">
        <div className="product-hero-glow" aria-hidden="true" />
        <div className="container product-hero-container">
          <div className="product-hero-meta">
            {product.docRef && <p className="section-label">{product.docRef}</p>}
            <span className="product-hero-badge">{common.flagship}</span>
          </div>
          <div className="product-hero-brand">
            <span className={`product-hero-logo-mark${hasLogo ? ' product-hero-logo-mark--image' : ''}`} aria-hidden="true">
              {hasLogo ? (
                <img src={product.logoSrc} alt="" className="product-hero-logo-image" />
              ) : (
                logoInitials
              )}
            </span>
            <div className="product-hero-titles">
              <h1 className="product-hero-name">{product.name}</h1>
              <p className="product-hero-tagline">{product.tagline}</p>
            </div>
          </div>
          <div className="gold-divider product-hero-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="product-hero-desc">{product.heroDesc}</p>
          <div className="product-hero-actions">
            <ProductCtaButtons
              bookDemoLabel={common.bookDemo}
              contactLabel={t.common.contactUs}
              launchAppLabel={common.launchApp}
              launch={launch}
              bookDemoTo={contactProductUrl}
              contactTo={contactProductUrl}
            />
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <p className="section-label">{common.productOverview}</p>
          <h2 className="product-section-title">{product.overviewTitle}</h2>
          <div className="product-overview-grid">
            <p className="product-overview-text">{product.overview}</p>
            <ul className="product-overview-points">
              {product.overviewPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="product-section product-section--dark" aria-labelledby="product-features-heading">
        <div className="container">
          <p className="section-label">{common.coreFeatures}</p>
          <h2 id="product-features-heading" className="product-section-title">{product.featuresTitle}</h2>
          <div className="product-features-grid">
            {product.features.map((feature) => (
              <article key={feature.key} className="product-feature-card">
                <div className="product-feature-icon">{PRODUCT_FEATURE_ICONS[feature.key]}</div>
                <h3 className="product-feature-title">{feature.title}</h3>
                <p className="product-feature-desc">{feature.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section product-section--gray">
        <div className="container">
          <p className="section-label">{common.screenshots}</p>
          <ProductScreenshotGallery
            title={product.screenshotsTitle}
            screenshots={product.screenshots}
            comingSoonLabel={common.screenshotsComingSoon}
            closeLabel={common.closeGallery}
          />
        </div>
      </section>

      <section className="product-section product-section--video">
        <div className="container">
          <p className="section-label">{common.demoVideo}</p>
          <ProductVideoEmbed
            title={product.videoTitle}
            subtitle={product.videoSubtitle}
            embedUrl={product.videoEmbedUrl}
            comingSoonLabel={common.demoComingSoon}
            comingSoonDesc={product.videoComingSoonDesc}
          />
        </div>
      </section>

      <section className="product-cta" aria-labelledby="product-cta-heading">
        <div className="product-cta-glow" aria-hidden="true" />
        <div className="container">
          <div className="product-cta-card">
            <div className="product-cta-content">
              <p className="section-label">{common.ctaEyebrow}</p>
              <h2 id="product-cta-heading" className="product-cta-title">{product.ctaTitle}</h2>
              <div className="gold-divider product-cta-divider">
                <div className="gold-divider-diamond" />
              </div>
              <p className="product-cta-sub">{product.ctaSub}</p>
              <a href="mailto:info@nexorasystems.ca" className="product-cta-email">
                info@nexorasystems.ca
              </a>
            </div>
            <div className="product-cta-actions">
              <ProductCtaButtons
                bookDemoLabel={common.bookDemo}
                contactLabel={t.common.contactUs}
                launchAppLabel={common.launchApp}
                launch={launch}
                bookDemoTo={contactProductUrl}
                contactTo={contactProductUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
