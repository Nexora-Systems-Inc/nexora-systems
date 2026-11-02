import './EquipmentStickyCta.css';

export default function EquipmentStickyCta({ onRequestInfo, onMakeOffer, priceDisplay }) {
  return (
    <div className="eq-sticky-cta" role="region" aria-label="Quick actions">
      <div className="eq-sticky-cta-price">{priceDisplay}</div>
      <div className="eq-sticky-cta-actions">
        <button type="button" className="btn-gold eq-sticky-cta-btn" onClick={onRequestInfo}>
          Request Info
        </button>
        <button type="button" className="btn-outline eq-sticky-cta-btn eq-sticky-cta-btn--offer" onClick={onMakeOffer}>
          Make an Offer
        </button>
      </div>
    </div>
  );
}
