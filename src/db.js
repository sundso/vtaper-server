const { Pool } = require("pg");

// Most hosted Postgres providers (Neon, Supabase, Render) require SSL
// but use certificates your Node install may not recognize by default —
// rejectUnauthorized: false keeps this simple for a personal project.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
