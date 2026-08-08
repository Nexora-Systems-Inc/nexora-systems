import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import EquipmentGallery from '../../components/equipment/EquipmentGallery';
import EquipmentInquiryForm from '../../components/equipment/EquipmentInquiryForm';
import EquipmentStickyCta from '../../components/equipment/EquipmentStickyCta';
import {
  getEquipmentBySlug,
  getPrimaryEquipmentImage,
} from '../../config/equipment';
import { SITE_NAME } from '../../config/site';
import { buildCanonicalUrl } from '../../seo/pageMeta';
import {
  toJsonLdScript,
} from '../../../platform/seo/structured-data.mjs';
import { absoluteUrl } from '../../../platform/seo/urls.mjs';
import './EquipmentListingPage.css';

function scrollToInquiry() {
  const el = document.getElementById('equipment-inquiry');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function upsertListingJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = toJsonLdScript(data);
}

function removeListingJsonLd(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export default function EquipmentListingPage() {
  const { slug } = useParams();
  const listing = getEquipmentBySlug(slug);
  const [inquiryType, setInquiryType] = useState('General Question');

  const primaryImage = useMemo(
    () => (listing ? getPrimaryEquipmentImage(listing) : null),
    [listing],
  );

  const openInquiry = useCallback((type) => {
    setInquiryType(type);
    // Allow state to flush before scrolling when already near the form.
    requestAnimationFrame(() => scrollToInquiry());
  }, []);

  useEffect(() => {
    if (!listing) return undefined;

    const pathname = `/equipment/${listing.slug}`;
    const canonical = buildCanonicalUrl(pathname);
    const imageUrl = primaryImage?.src
      ? absoluteUrl(primaryImage.src)
      : absoluteUrl('/og-image.svg');

    const productLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${listing.title} — ${listing.subtitle}`,
      description: listing.seo.description,
      brand: {
        '@type': 'Brand',
        name: listing.manufacturer,
      },
      model: listing.model,
      serialNumber: listing.serial,
      category: 'Industrial Laser Cutting Machine',
      image: primaryImage?.src ? [imageUrl] : undefined,
      offers: {
        '@type': 'Offer',
        url: canonical,
        priceCurrency: listing.price.currency,
        price: listing.price.amount,
        priceValidUntil: '2027-12-31',
        availability: listing.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
        itemCondition: 'https://schema.org/UsedCondition',
        seller: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: buildCanonicalUrl('/'),
        },
      },
      additionalProperty: listing.specifications.slice(0, 12).map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })),
    };

    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: listing.faqs
        .filter((faq) => faq.answer)
        .map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
    };

    upsertListingJsonLd('nexora-ld-equipment-product', productLd);
    upsertListingJsonLd('nexora-ld-equipment-faq', faqLd);

    return () => {
      removeListingJsonLd('nexora-ld-equipment-product');
      removeListingJsonLd('nexora-ld-equipment-faq');
    };
  }, [listing, primaryImage]);

  if (!listing) {
    return <Navigate to="/equipment" replace />;
  }

  return (
    <div className="eq-listing-page">
      <section className="eq-listing-hero">
        <div className="eq-listing-hero-bg" aria-hidden="true" />
        <div className="container eq-listing-hero-inner">
          <nav className="eq-listing-breadcrumb" aria-label="Breadcrumb">
            <Link to="/equipment">Equipment</Link>
            <span aria-hidden="true">/</span>
            <span>{listing.manufacturer} {listing.model}</span>
          </nav>

          <div className="eq-listing-hero-grid">
            <div className="eq-listing-hero-copy">
              <p className="section-label">For sale · {listing.location.display}</p>
              <h1 className="eq-listing-title">{listing.title}</h1>
              <p className="eq-listing-subtitle">{listing.subtitle}</p>
              <div className="gold-divider eq-listing-divider">
                <div className="gold-divider-diamond" />
              </div>
              <p className="eq-listing-price">{listing.price.display}</p>
              <p className="eq-listing-status">{listing.conditionStatus}</p>

              <ul className="eq-listing-highlights">
                {listing.heroHighlights.map((item) => (
                  <li key={item.label}>
                    <span className="eq-listing-highlight-label">{item.label}</span>
                    <span className="eq-listing-highlight-value">{item.value}</span>
                  </li>
                ))}
              </ul>

              <div className="eq-listing-hero-actions">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={() => openInquiry('General Question')}
                >
                  Request Information
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => openInquiry('Make an Offer')}
                >
                  Make an Offer
                </button>
              </div>
            </div>

            <div className="eq-listing-hero-visual">
              {primaryImage?.src ? (
                <img
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  className="eq-listing-hero-image"
                />
              ) : (
                <div className="eq-listing-hero-placeholder" role="img" aria-label="Machine photograph pending">
                  <span className="eq-listing-hero-placeholder-mark">N</span>
                  <span className="eq-listing-hero-placeholder-title">{listing.manufacturer}</span>
                  <span className="eq-listing-hero-placeholder-sub">{listing.model} · Serial {listing.serial}</span>
                  <span className="eq-listing-hero-placeholder-note">Photography pending</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="eq-listing-section eq-listing-section--facts" aria-labelledby="eq-key-facts">
        <div className="container">
          <p className="section-label">At a glance</p>
          <h2 id="eq-key-facts" className="eq-listing-section-title">Key facts</h2>
          <dl className="eq-key-facts">
            {listing.keyFacts.map((fact) => (
              <div key={fact.label} className="eq-key-fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="eq-listing-section" aria-labelledby="eq-overview">
        <div className="container eq-listing-two-col">
          <div>
            <p className="section-label">Machine overview</p>
            <h2 id="eq-overview" className="eq-listing-section-title">Industrial CO₂ cutting system</h2>
            <div className="eq-listing-prose">
              {listing.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <p className="eq-listing-representation">{listing.representation}</p>
          </div>
          <aside className="eq-listing-aside">
            <p className="eq-listing-aside-label">Asking price</p>
            <p className="eq-listing-aside-price">{listing.price.display}</p>
            <p className="eq-listing-aside-note">As-is · Buyer responsible for rigging & transport unless negotiated</p>
            <button
              type="button"
              className="btn-gold eq-listing-aside-btn"
              onClick={() => openInquiry('Request Inspection')}
            >
              Request Inspection
            </button>
          </aside>
        </div>
      </section>

      <section className="eq-listing-section eq-listing-section--dark" aria-labelledby="eq-gallery">
        <div className="container">
          <p className="section-label">Photography</p>
          <h2 id="eq-gallery" className="eq-listing-section-title">Machine gallery</h2>
          <EquipmentGallery images={listing.images} title={`${listing.title} gallery`} />
        </div>
      </section>

      <section className="eq-listing-section" aria-labelledby="eq-specs">
        <div className="container">
          <p className="section-label">Technical details</p>
          <h2 id="eq-specs" className="eq-listing-section-title">Specifications</h2>
          <div className="eq-spec-table-wrap">
            <table className="eq-spec-table">
              <tbody>
                {listing.specifications.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="eq-listing-section eq-listing-section--muted" aria-labelledby="eq-included">
        <div className="container eq-listing-split">
          <div>
            <p className="section-label">Package</p>
            <h2 id="eq-included" className="eq-listing-section-title">Included equipment</h2>
            <ul className="eq-included-list">
              {listing.includedEquipment.map((item) => (
                <li key={item}>
                  <span className="check-gold" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="section-label">Condition</p>
            <h2 className="eq-listing-section-title">Current status</h2>
            <p className="eq-listing-prose-lead">{listing.condition.summary}</p>
            <ul className="eq-condition-list">
              {listing.condition.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="eq-listing-section" aria-labelledby="eq-logistics">
        <div className="container">
          <p className="section-label">Logistics</p>
          <h2 id="eq-logistics" className="eq-listing-section-title">Inspection, rigging & transportation</h2>
          <div className="eq-logistics-facts">
            <div>
              <p className="eq-logistics-label">Approx. weight</p>
              <p className="eq-logistics-value">{listing.logistics.approximateWeight}</p>
            </div>
            <div>
              <p className="eq-logistics-label">Approx. dimensions</p>
              <p className="eq-logistics-value">{listing.logistics.approximateDimensions}</p>
            </div>
            <div>
              <p className="eq-logistics-label">Location</p>
              <p className="eq-logistics-value">{listing.location.display}</p>
            </div>
          </div>
          <div className="eq-listing-prose">
            {listing.logistics.notes.map((note) => (
              <p key={note.slice(0, 40)}>{note}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="eq-listing-section eq-listing-section--muted" aria-labelledby="eq-faq">
        <div className="container">
          <p className="section-label">Buyer FAQ</p>
          <h2 id="eq-faq" className="eq-listing-section-title">Common questions</h2>
          <div className="eq-faq-list">
            {listing.faqs.map((faq) => (
              <details key={faq.question} className="eq-faq-item">
                <summary>{faq.question}</summary>
                <div className="eq-faq-body">
                  {faq.answer ? (
                    <p>{faq.answer}</p>
                  ) : (
                    <p>
                      {faq.inquiryPrompt || 'This detail requires seller confirmation.'}{' '}
                      <button
                        type="button"
                        className="eq-faq-cta"
                        onClick={() => openInquiry('General Question')}
                      >
                        Submit an inquiry
                      </button>
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="eq-listing-section eq-listing-section--form">
        <div className="container eq-listing-form-wrap">
          <EquipmentInquiryForm
            listing={listing}
            initialInquiryType={inquiryType}
            formId="equipment-inquiry"
          />
        </div>
      </section>

      <EquipmentStickyCta
        priceDisplay={listing.price.display}
        onRequestInfo={() => openInquiry('General Question')}
        onMakeOffer={() => openInquiry('Make an Offer')}
      />
    </div>
  );
}
