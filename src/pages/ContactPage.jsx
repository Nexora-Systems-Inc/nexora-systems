import { useState } from 'react';
import { useLang } from '../context/LangContext';

export default function ContactPage() {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', service: '' });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const services = lang === 'en'
    ? ['Website Development', 'Web Applications', 'Workflow Automation', 'AI Construction', 'AI Receptionists', 'Custom Solutions']
    : ['Développement Web', 'Applications Web', 'Automatisation', 'IA Construction', 'Réceptionnistes IA', 'Solutions sur mesure'];

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">{lang === 'en' ? 'Get in Touch' : 'Contactez-nous'}</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--white)', marginTop: 8, marginBottom: 16 }}>
            {lang === 'en' ? 'Contact Us' : 'Nous contacter'}
          </h1>
          <div className="gold-divider" style={{ margin: '12px 0 20px', maxWidth: 400 }}>
            <div className="gold-divider-diamond" />
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 480, lineHeight: 1.75, fontWeight: 300 }}>
            {lang === 'en'
              ? 'Every project starts with a conversation. Tell us about your business and your goals.'
              : 'Chaque projet commence par une conversation. Parlez-nous de votre entreprise et de vos objectifs.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 72, maxWidth: 900 }}>
          <div>
            <p className="section-label">{lang === 'en' ? 'Reach Us' : 'Nous joindre'}</p>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, marginBottom: 28, marginTop: 8 }}>
              {lang === 'en' ? 'Let\'s talk.' : 'Parlons-en.'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Email</p>
                <a href="mailto:info@nexorasystems.ca" style={{ fontSize: 15, color: 'var(--black)', fontWeight: 500 }}>info@nexorasystems.ca</a>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                  {lang === 'en' ? 'Service Area' : 'Zone desservie'}
                </p>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 }}>Ontario & Quebec, Canada</p>
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
                  {lang === 'en' ? 'Languages' : 'Langues'}
                </p>
                <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>English | Français</p>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(201,168,76,0.3)', padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 12 }}>
                  {lang === 'en' ? 'Message Received' : 'Message reçu'}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>
                  {lang === 'en' ? "We'll be in touch shortly." : "Nous vous contacterons sous peu."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { name: 'name', label: lang === 'en' ? 'Full Name' : 'Nom complet', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'company', label: lang === 'en' ? 'Company (optional)' : 'Entreprise (facultatif)', type: 'text', required: false },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-700)', marginBottom: 6 }}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--white)', outline: 'none' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-700)', marginBottom: 6 }}>
                    {lang === 'en' ? 'Service of Interest' : 'Service d\'intérêt'}
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--white)', outline: 'none' }}
                  >
                    <option value="">{lang === 'en' ? 'Select a service...' : 'Choisir un service...'}</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-700)', marginBottom: 6 }}>
                    {lang === 'en' ? 'Message' : 'Message'}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.15)', fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--white)', resize: 'vertical', outline: 'none' }}
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start' }}>
                  {lang === 'en' ? 'Send Message' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
