import { Link } from 'react-router-dom';
import { getEquipmentPath, getPrimaryEquipmentImage } from '../../config/equipment';
import './EquipmentCard.css';

const STATUS_LABELS = {
  available: 'Available',
  pending: 'Pending',
  sold: 'Sold',
};

export default function EquipmentCard({ listing }) {
  const path = getEquipmentPath(listing);
  const image = getPrimaryEquipmentImage(listing);
  const statusLabel = STATUS_LABELS[listing.status] || listing.status;

  return (
    <article className="eq-card">
      <Link to={path} className="eq-card-media" aria-label={`View ${listing.title}`}>
        {image?.src ? (
          <img src={image.src} alt={image.alt} className="eq-card-image" loading="lazy" />
        ) : (
          <div className="eq-card-placeholder" aria-hidden="true">
            <span className="eq-card-placeholder-mark">N</span>
            <span className="eq-card-placeholder-label">Photography pending</span>
          </div>
        )}
      </Link>

      <div className="eq-card-body">
        <div className="eq-card-meta">
          <span className="eq-card-status">{statusLabel}</span>
          <span className="eq-card-location">{listing.location.display}</span>
        </div>
        <h2 className="eq-card-title">
          <Link to={path}>{listing.title}</Link>
        </h2>
        <p className="eq-card-subtitle">{listing.subtitle}</p>
        <p className="eq-card-summary">{listing.cardSummary}</p>
        <div className="eq-card-footer">
          <p className="eq-card-price">{listing.price.display}</p>
          <Link to={path} className="eq-card-link">
            View listing
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
