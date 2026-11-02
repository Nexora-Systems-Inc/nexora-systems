import { Link } from 'react-router-dom';
import EquipmentCard from '../../components/equipment/EquipmentCard';
import {
  EQUIPMENT_INDEX_META,
  listAvailableEquipment,
} from '../../config/equipment';
import './EquipmentIndexPage.css';

export default function EquipmentIndexPage() {
  const listings = listAvailableEquipment();

  return (
    <div className="eq-index-page">
      <section className="page-hero eq-index-hero">
        <div className="container">
          <p className="section-label">Nexora Systems</p>
          <h1 className="eq-index-title">{EQUIPMENT_INDEX_META.heading}</h1>
          <div className="gold-divider eq-index-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="eq-index-sub">{EQUIPMENT_INDEX_META.subheading}</p>
          <p className="eq-index-note">
            Listings are professionally presented by Nexora on behalf of sellers. Nexora does not own listed equipment and does not provide mechanical certification, warranty, or equipment guarantees.
          </p>
        </div>
      </section>

      <section className="eq-index-section">
        <div className="container">
          <div className="eq-index-section-head">
            <p className="section-label">Available now</p>
            <h2 className="eq-index-section-title">Featured equipment</h2>
          </div>

          {listings.length > 0 ? (
            <div className="eq-index-list">
              {listings.map((listing) => (
                <EquipmentCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <p className="eq-index-empty">
              No equipment is currently listed. Check back soon, or{' '}
              <Link to="/contact">contact Nexora</Link> about presenting industrial equipment for sale.
            </p>
          )}
        </div>
      </section>

      <section className="eq-index-cta">
        <div className="container eq-index-cta-inner">
          <div>
            <p className="section-label">For sellers & partners</p>
            <h2 className="eq-index-cta-title">Need equipment presented professionally?</h2>
            <p className="eq-index-cta-desc">
              Nexora can market industrial equipment on behalf of clients and partners with a dedicated sales page, inquiry capture, and shareable listing URL.
            </p>
          </div>
          <Link to="/contact" className="btn-gold">
            Talk to Nexora
          </Link>
        </div>
      </section>
    </div>
  );
}
