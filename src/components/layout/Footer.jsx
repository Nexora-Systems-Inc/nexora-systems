import { Link } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { SERVICE_NAV_ITEMS } from '../../config/services';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-n">N</span>
              <span className="footer-logo-text">
                <span className="footer-logo-nexora">Nexora</span>
                <span className="footer-logo-systems">SYSTEMS</span>
              </span>
            </div>
            <p className="footer-tagline">{t.home.tagline}</p>
            <p className="footer-location">Ontario &amp; Quebec, Canada</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">{t.nav.services}</p>
            {SERVICE_NAV_ITEMS.map((s) => (
              <Link key={s.key} to={s.path}>{t.nav[s.key]}</Link>
            ))}
          </div>

          <div className="footer-col">
            <p className="footer-col-title">{t.nav.about}</p>
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/contact">{t.nav.contact}</Link>
            <Link to="/equipment">{t.footer.equipment}</Link>
            <a href="mailto:info@nexorasystems.ca">info@nexorasystems.ca</a>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">{t.footer.legal}</p>
            <Link to="/privacy">{t.footer.privacy}</Link>
            <Link to="/terms">{t.footer.terms}</Link>
            <Link to="/account-deletion">{t.footer.accountDeletion}</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider">
            <div className="gold-divider-diamond" />
          </div>
          <div className="footer-bottom-row">
            <p className="footer-copy">© {new Date().getFullYear()} Nexora Systems. All rights reserved.</p>
            <p className="footer-doc">NXS-006 | nexorasystems.ca</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
