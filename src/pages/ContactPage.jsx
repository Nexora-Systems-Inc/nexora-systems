import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './ContactPage.css';

const PRODUCT_SERVICE_MAP = {
  crewpilot: { en: 'CrewPilot', fr: 'CrewPilot' },
};

export default function ContactPage() {
  const { lang, t } = useLang();
  const c = t.contact;
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', service: '' });

  useEffect(() => {
    const product = searchParams.get('product');
    const intent = searchParams.get('intent');
    if (product && PRODUCT_SERVICE_MAP[product]) {
      const serviceName = PRODUCT_SERVICE_MAP[product][lang];
      setForm((prev) => ({
        ...prev,
        service: serviceName,
        message: intent === 'demo' && !prev.message
          ? (lang === 'en'
            ? 'I would like to book a demo of CrewPilot.'
            : 'Je souhaite réserver une démo de CrewPilot.')
          : prev.message,
      }));
    }
  }, [searchParams, lang]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Nexora Inquiry${form.service ? ` — ${form.service}` : ''}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || 'N/A'}\nService: ${form.service || 'N/A'}\n\n${form.message}`,
    );
    window.location.href = `mailto:info@nexorasystems.ca?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{c.heroLabel}</p>
          <h1 className="contact-hero-title">{c.heroTitle}</h1>
          <div className="gold-divider contact-hero-divider">
            <div className="gold-divider-diamond" />
          </div>
          <p className="contact-hero-desc">{c.heroDesc}</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div>
            <p className="section-label">{c.reachUs}</p>
            <h2 className="contact-sidebar-title">{c.letsTalk}</h2>
            <div className="contact-details">
              <div>
                <p className="contact-detail-label">Email</p>
                <a href="mailto:info@nexorasystems.ca" className="contact-detail-value">info@nexorasystems.ca</a>
              </div>
              <div>
                <p className="contact-detail-label">{c.serviceArea}</p>
                <p className="contact-detail-muted">Ontario &amp; Quebec, Canada</p>
              </div>
              <div>
                <p className="contact-detail-label">{c.languages}</p>
                <p className="contact-detail-muted">English | Français</p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="contact-success" role="status">
                <div className="contact-success-icon" aria-hidden="true">✓</div>
                <h3 className="contact-success-title">{c.successTitle}</h3>
                <p className="contact-success-desc">{c.successDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {[
                  { name: 'name', label: c.fullName, type: 'text', required: true, autoComplete: 'name' },
                  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
                  { name: 'company', label: c.company, type: 'text', required: false, autoComplete: 'organization' },
                ].map((field) => (
                  <div key={field.name} className="contact-field">
                    <label htmlFor={field.name} className="contact-label">{field.label}</label>
                    <input
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      autoComplete={field.autoComplete}
                      className="contact-input"
                    />
                  </div>
                ))}
                <div className="contact-field">
                  <label htmlFor="service" className="contact-label">{c.serviceInterest}</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="contact-input"
                  >
                    <option value="">{c.selectService}</option>
                    {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="contact-field">
                  <label htmlFor="message" className="contact-label">{c.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="contact-input contact-textarea"
                  />
                </div>
                <button type="submit" className="btn-gold contact-submit">
                  {c.sendMessage}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
