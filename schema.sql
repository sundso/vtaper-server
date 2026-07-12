-- Run this once against your Postgres database before starting the server.
-- (Neon/Supabase both have a SQL editor in their dashboard where you can paste this.)

CREATE TABLE IF NOT EXISTS meta (
  id SERIAL PRIMARY KEY,
  start_date TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  date TIMESTAMPTZ NOT NULL,
  day_type TEXT NOT NULL,
  week INTEGER,
  phase TEXT,
  exercises JSONB,
  pump JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_logs_date ON logs (date);

CREATE TABLE IF NOT EXISTS body_stats (
  id SERIAL PRIMARY KEY,
  date TIMESTAMPTZ NOT NULL,
  weight NUMERIC,
  body_fat NUMERIC,
  muscle_mass NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_body_stats_date ON body_stats (date);
