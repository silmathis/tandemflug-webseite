CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    flight_type TEXT NOT NULL,
    preferred_date DATE,
    preferred_time TEXT,
    weight_kg INTEGER,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
