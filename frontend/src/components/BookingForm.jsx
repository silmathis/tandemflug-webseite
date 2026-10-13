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
      setStatus({ state: 'error', message: 'Bitte alle Pflichtfelder ausfüllen.' });
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setStatus({ state: 'error', message: 'Bitte eine gültige E-Mail-Adresse eingeben.' });
      return;
    }

    if (trimmedWeight && Number.isNaN(Number(trimmedWeight))) {
      setStatus({ state: 'error', message: 'Das Gewicht muss numerisch sein.' });
      return;
    }

    setStatus({ state: 'loading', message: 'Buchungsanfrage wird gesendet...' });

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
        throw new Error(errorBody.error || 'Die Buchungsanfrage ist fehlgeschlagen.');
      }

      setFormData(createInitialState());
      setStatus({
        state: 'success',
        message: 'Danke für deine Buchungsanfrage. Wir melden uns bald bei dir.',
      });
      onSubmitted?.();
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message || 'Beim Senden der Anfrage ist ein Fehler aufgetreten.',
      });
    }
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form__grid">
        <label>
          Vorname *
          <input name="firstName" value={formData.firstName} onChange={updateField} type="text" autoComplete="given-name" required />
        </label>
        <label>
          Nachname *
          <input name="lastName" value={formData.lastName} onChange={updateField} type="text" autoComplete="family-name" required />
        </label>
        <label>
          E-Mail *
          <input name="email" value={formData.email} onChange={updateField} type="email" autoComplete="email" required />
        </label>
        <label>
          Telefonnummer
          <input name="phone" value={formData.phone} onChange={updateField} type="tel" autoComplete="tel" placeholder="+41790000000" />
        </label>
        <label>
          Flugart *
          <select name="flightType" value={formData.flightType} onChange={updateField} required>
            <option value="">Flug auswählen</option>
            <option value="Panoramaflug">Panoramaflug</option>
            <option value="Thermikflug">Thermikflug</option>
            <option value="Abenteuerflug">Abenteuerflug</option>
            <option value="Geschenkgutschein">Geschenkgutschein</option>
          </select>
        </label>
        <label>
          Bevorzugtes Datum
          <input name="preferredDate" value={formData.preferredDate} onChange={updateField} type="date" />
        </label>
        <label>
          Bevorzugte Uhrzeit
          <input name="preferredTime" value={formData.preferredTime} onChange={updateField} type="time" />
        </label>
        <label>
          Gewicht (kg)
          <input name="weightKg" value={formData.weightKg} onChange={updateField} type="number" min="0" step="1" inputMode="numeric" />
        </label>
      </div>
      <label className="booking-form__message">
        Nachricht
        <textarea name="message" value={formData.message} onChange={updateField} rows="5" placeholder="Teile uns Wunschdatum, Erfahrung oder Fragen mit." />
      </label>

      <div className="booking-form__footer">
        <button type="submit" className="button button--primary">
          Anfrage senden
        </button>
        <p className={`booking-form__status booking-form__status--${status.state}`} aria-live="polite">
          {status.message}
        </p>
      </div>
    </form>
  );
}