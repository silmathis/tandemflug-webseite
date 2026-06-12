const express = require('express');
const pool = require('../db');

const router = express.Router();

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function normalizeOptionalText(value) {
  const text = normalizeText(value);
  return text.length > 0 ? text : null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/', async (req, res, next) => {
  try {
    const firstName = normalizeText(req.body.firstName);
    const lastName = normalizeText(req.body.lastName);
    const email = normalizeText(req.body.email);
    const phone = normalizeOptionalText(req.body.phone);
    const flightType = normalizeText(req.body.flightType);
    const preferredDate = normalizeOptionalText(req.body.preferredDate);
    const preferredTime = normalizeOptionalText(req.body.preferredTime);
    const message = normalizeOptionalText(req.body.message);

    if (!firstName || !lastName || !email || !flightType) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    let weightKg = null;
    if (req.body.weightKg !== undefined && req.body.weightKg !== null && req.body.weightKg !== '') {
      const parsedWeight = Number(req.body.weightKg);
      if (!Number.isFinite(parsedWeight)) {
        return res.status(400).json({ error: 'Weight must be numeric.' });
      }
      weightKg = Math.round(parsedWeight);
    }

    await pool.query(
      `
        INSERT INTO bookings (
          first_name,
          last_name,
          email,
          phone,
          flight_type,
          preferred_date,
          preferred_time,
          weight_kg,
          message
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        flightType,
        preferredDate,
        preferredTime,
        weightKg,
        message,
      ]
    );

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
