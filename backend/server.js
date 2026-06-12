require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bookingsRouter = require('./routes/bookings');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ success: true });
});

app.use('/api/bookings', bookingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
