import { useEffect, useMemo, useState } from 'react';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  flightType: '',
  preferredDate: '',
  preferredTime: '',
  weightKg: '',
  message: '',
};

function createInitialState(flightType = '') {
  return {
    ...initialFormState,
    flightType,
  };
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookingForm({ flightTypePreset, onSubmitted }) {
  const [formData, setFormData] = useState(() => createInitialState(flightTypePreset));
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    setFormData((currentValue) => ({
      ...currentValue,
      flightType: flightTypePreset || currentValue.flightType,
    }));
  }, [flightTypePreset]);

  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:3000', []);

  function updateField(event) {
    const { name, value } = event.target;

    setFormData((currentValue) => ({
      ...currentValue,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: 'idle', message: '' });

    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedFlightType = formData.flightType.trim();
    const trimmedWeight = formData.weightKg.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedFlightType) {
      setStatus({ state: 'error', message: 'Please fill in the required fields.' });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (trimmedWeight && Number.isNaN(Number(trimmedWeight))) {
      setStatus({ state: 'error', message: 'Weight must be numeric.' });
      return;
    }

    setStatus({ state: 'loading', message: 'Submitting booking request...' });

    try {
      const response = await fetch(`${apiBaseUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail,
          phone: formData.phone.trim(),
          flightType: trimmedFlightType,
          preferredDate: formData.preferredDate || null,
          preferredTime: formData.preferredTime || null,
          weightKg: trimmedWeight ? Number(trimmedWeight) : null,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.error || 'Booking request failed.');
      }

      setFormData(createInitialState());
      setStatus({
        state: 'success',
        message: 'Thank you for your booking request. We will contact you shortly.',
      });
      onSubmitted?.();
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message || 'Something went wrong while sending your request.',
      });
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form__grid">
        <label>
          First Name *
          <input name="firstName" value={formData.firstName} onChange={updateField} type="text" autoComplete="given-name" required />
        </label>
        <label>
          Last Name *
          <input name="lastName" value={formData.lastName} onChange={updateField} type="text" autoComplete="family-name" required />
        </label>
        <label>
          Email *
          <input name="email" value={formData.email} onChange={updateField} type="email" autoComplete="email" required />
        </label>
        <label>
          Phone Number
          <input name="phone" value={formData.phone} onChange={updateField} type="tel" autoComplete="tel" placeholder="+41790000000" />
        </label>
        <label>
          Flight Type *
          <select name="flightType" value={formData.flightType} onChange={updateField} required>
            <option value="">Select a flight</option>
            <option value="Panorama">Panorama Flight</option>
            <option value="Thermal">Thermal Flight</option>
            <option value="Adventure">Adventure Flight</option>
            <option value="Gift Voucher">Gift Voucher</option>
          </select>
        </label>
        <label>
          Preferred Date
          <input name="preferredDate" value={formData.preferredDate} onChange={updateField} type="date" />
        </label>
        <label>
          Preferred Time
          <input name="preferredTime" value={formData.preferredTime} onChange={updateField} type="time" />
        </label>
        <label>
          Weight (kg)
          <input name="weightKg" value={formData.weightKg} onChange={updateField} type="number" min="0" step="1" inputMode="numeric" />
        </label>
      </div>
      <label className="booking-form__message">
        Message
        <textarea name="message" value={formData.message} onChange={updateField} rows="5" placeholder="Tell us more about your preferred date, experience, or questions." />
      </label>

      <div className="booking-form__footer">
        <button type="submit" className="button button--primary">
          Request Booking
        </button>
        <p className={`booking-form__status booking-form__status--${status.state}`} aria-live="polite">
          {status.message}
        </p>
      </div>
    </form>
  );
}