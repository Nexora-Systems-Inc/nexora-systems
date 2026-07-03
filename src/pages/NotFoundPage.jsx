import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

export default function NotFoundPage() {
  const { t } = useLang();

  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <p className="section-label">404</p>
        <h1 className="not-found-title">
          {t.notFound.title}
        </h1>
        <div className="gold-divider not-found-divider">
          <div className="gold-divider-diamond" />
        </div>
        <p className="not-found-desc">{t.notFound.desc}</p>
        <div className="not-found-actions">
          <Link to="/" className="btn-gold">{t.notFound.home}</Link>
          <Link to="/contact" className="btn-outline-dark">{t.common.contactUs}</Link>
        </div>
      </div>
    </section>
  );
}
