-- Run against the separate purepic_website database. Safe to run again.
CREATE TABLE IF NOT EXISTS demo_leads (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(150) NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
