# Tandem Flight Booking Website

Full-stack paragliding tandem booking site with a React/Vite frontend, an Express API, and PostgreSQL.

## Run With Docker

```bash
docker compose up --build
```

Open:

```text
http://localhost:5173
```

## Services

- Frontend: React + Vite on port 5173
- Backend: Express API on port 3000
- Database: PostgreSQL 16 on port 5432

## Booking Flow

```text
Customer submits booking request
↓
Booking stored in database
↓
Pilot reviews request
↓
Pilot manually confirms or rejects booking
```

## API

- `POST /api/bookings`

## Database

The schema is created from `database/init.sql` when the PostgreSQL container starts for the first time.

## Local Development

The Docker setup mounts source volumes for hot reload. If you run services manually outside Docker, use the variables from `.env`.
