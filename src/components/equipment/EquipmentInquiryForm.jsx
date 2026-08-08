import { useEffect, useId, useState } from 'react';
import './EquipmentInquiryForm.css';

const BUYER_TYPES = ['End User', 'Machinery Dealer', 'Broker', 'Other'];
const INQUIRY_TYPES = ['General Question', 'Request Inspection', 'Make an Offer'];

const INITIAL = {
  name: '',
  company: '',
  email: '',
  phone: '',
  city: '',
  province: '',
  country: 'Canada',
  buyerType: '',
  inquiryType: 'General Question',
  offerAmount: '',
  message: '',
  website: '', // honeypot
};

export default function EquipmentInquiryForm({
  listing,
  initialInquiryType = 'General Question',
  formId = 'equipment-inquiry',
}) {
  const uid = useId();
  const [form, setForm] = useState({
    ...INITIAL,
    inquiryType: initialInquiryType || 'General Question',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!initialInquiryType) return;
    setForm((prev) => ({ ...prev, inquiryType: initialInquiryType }));
  }, [initialInquiryType]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError('');
    setFieldErrors({});

    try {
      const response = await fetch('/api/equipment-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          equipmentSlug: listing.slug,
          equipmentTitle: listing.title,
        }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (!response.ok || !payload?.success) {
        if (payload?.fields) setFieldErrors(payload.fields);
        setError(
          payload?.error
            || 'Something went wrong while sending your inquiry. Please try again, or email info@nexorasystems.ca.',
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        'Something went wrong while sending your inquiry. Please try again, or email info@nexorasystems.ca.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="eq-form-success" role="status" id={formId}>
        <div className="eq-form-success-icon" aria-hidden="true">✓</div>
        <h3 className="eq-form-success-title">Inquiry received</h3>
        <p className="eq-form-success-desc">
          Thank you. Your message about the {listing.title} has been sent to Nexora Systems. We will follow up shortly on behalf of the seller.
        </p>
      </div>
    );
  }

  const showOffer = form.inquiryType === 'Make an Offer';

  return (
    <form
      id={formId}
      className="eq-form"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${uid}-heading`}
    >
      <div className="eq-form-intro">
        <p className="section-label">Inquiry</p>
        <h2 id={`${uid}-heading`} className="eq-form-title">Request information or make an offer</h2>
        <p className="eq-form-desc">
          Qualified buyers, dealers, and brokers — tell us how to reach you. Nexora will relay your inquiry to the seller.
        </p>
      </div>

      <div className="eq-form-grid">
        {[
          { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
          { name: 'company', label: 'Company', required: true, autoComplete: 'organization' },
          { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
          { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
          { name: 'city', label: 'City', required: true, autoComplete: 'address-level2' },
          { name: 'province', label: 'Province', required: true, autoComplete: 'address-level1' },
          { name: 'country', label: 'Country', required: true, autoComplete: 'country-name' },
        ].map((field) => (
          <div key={field.name} className="eq-form-field">
            <label htmlFor={`${uid}-${field.name}`} className="eq-form-label">
              {field.label}
            </label>
            <input
              id={`${uid}-${field.name}`}
              name={field.name}
              type={field.type || 'text'}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
              autoComplete={field.autoComplete}
              className={`eq-form-input${fieldErrors[field.name] ? ' eq-form-input--error' : ''}`}
              disabled={submitting}
            />
            {fieldErrors[field.name] ? (
              <p className="eq-form-field-error">{fieldErrors[field.name]}</p>
            ) : null}
          </div>
        ))}

        <div className="eq-form-field">
          <label htmlFor={`${uid}-buyerType`} className="eq-form-label">Buyer type</label>
          <select
            id={`${uid}-buyerType`}
            name="buyerType"
            value={form.buyerType}
            onChange={handleChange}
            required
            className={`eq-form-input${fieldErrors.buyerType ? ' eq-form-input--error' : ''}`}
            disabled={submitting}
          >
            <option value="">Select buyer type…</option>
            {BUYER_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {fieldErrors.buyerType ? (
            <p className="eq-form-field-error">{fieldErrors.buyerType}</p>
          ) : null}
        </div>

        <div className="eq-form-field">
          <label htmlFor={`${uid}-inquiryType`} className="eq-form-label">Inquiry</label>
          <select
            id={`${uid}-inquiryType`}
            name="inquiryType"
            value={form.inquiryType}
            onChange={handleChange}
            required
            className={`eq-form-input${fieldErrors.inquiryType ? ' eq-form-input--error' : ''}`}
            disabled={submitting}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {showOffer ? (
          <div className="eq-form-field eq-form-field--full">
            <label htmlFor={`${uid}-offerAmount`} className="eq-form-label">Offer amount</label>
            <input
              id={`${uid}-offerAmount`}
              name="offerAmount"
              type="text"
              value={form.offerAmount}
              onChange={handleChange}
              required
              placeholder="e.g. C$60,000"
              className={`eq-form-input${fieldErrors.offerAmount ? ' eq-form-input--error' : ''}`}
              disabled={submitting}
            />
            {fieldErrors.offerAmount ? (
              <p className="eq-form-field-error">{fieldErrors.offerAmount}</p>
            ) : null}
          </div>
        ) : null}

        <div className="eq-form-field eq-form-field--full">
          <label htmlFor={`${uid}-message`} className="eq-form-label">Message</label>
          <textarea
            id={`${uid}-message`}
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className={`eq-form-input eq-form-textarea${fieldErrors.message ? ' eq-form-input--error' : ''}`}
            disabled={submitting}
          />
          {fieldErrors.message ? (
            <p className="eq-form-field-error">{fieldErrors.message}</p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — visually hidden; leave empty */}
      <div className="eq-form-hp" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      {error ? <p className="eq-form-error" role="alert">{error}</p> : null}

      <button type="submit" className="btn-gold eq-form-submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? 'Sending…' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
