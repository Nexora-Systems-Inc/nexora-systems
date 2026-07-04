import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { SERVICE_NAV_ITEMS } from '../../config/services';
import './Navbar.css';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handle(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-n">N</span>
          <span className="navbar-logo-text">
            <span className="navbar-logo-nexora">Nexora</span>
            <span className="navbar-logo-systems">SYSTEMS</span>
          </span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <div className="navbar-dropdown" ref={dropRef}>
            <button
              className={`navbar-link ${location.pathname.startsWith('/services') ? 'active' : ''}`}
              onClick={() => setDropdownOpen(v => !v)}
              onKeyDown={(e) => { if (e.key === 'Escape') setDropdownOpen(false); }}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {t.nav.services}
              <svg className={`navbar-chevron ${dropdownOpen ? 'rotated' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="navbar-dropdown-menu">
                {SERVICE_NAV_ITEMS.map(s => (
                  <Link key={s.key} to={s.path} className="navbar-dropdown-item">
                    {t.nav[s.key]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}>
            {t.nav.about}
          </Link>
          <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            {t.nav.contact}
          </Link>

          <div className="navbar-lang">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >EN</button>
            <span className="lang-sep" aria-hidden="true">|</span>
            <button
              className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
              onClick={() => setLang('fr')}
              aria-pressed={lang === 'fr'}
            >FR</button>
          </div>
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
