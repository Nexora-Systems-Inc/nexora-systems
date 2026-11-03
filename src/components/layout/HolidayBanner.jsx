import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { isHolidayOfferActive } from '../../config/holidayOffer';
import './HolidayBanner.css';

export default function HolidayBanner() {
  const { t } = useLang();
  const { pathname } = useLocation();
  if (!isHolidayOfferActive()) return null;
  if (pathname.replace(/\/+$/, '') === '/holiday-launch') return null;
  const copy = t.holidayBanner;
  return (
    <aside className="holiday-banner" aria-label={copy.aria}>
      <Link to="/holiday-launch" className="holiday-banner-link">
        <span className="holiday-banner-text">{copy.text}</span>
        <span className="holiday-banner-cta" aria-hidden="true">{copy.cta} →</span>
      </Link>
    </aside>
  );
}
