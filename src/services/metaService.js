const pool = require("../db");

// All DB access for the "meta" table (program start date) lives here.

async function getLatestMeta() {
  const result = await pool.query("SELECT start_date FROM meta ORDER BY id DESC LIMIT 1");
  return result.rows[0] || null;
}

async function setMeta(startDate) {
  await pool.query("DELETE FROM meta");
  await pool.query("INSERT INTO meta (start_date) VALUES ($1)", [startDate]);
}

async function deleteAllMeta() {
  await pool.query("DELETE FROM meta");
}

module.exports = { getLatestMeta, setMeta, deleteAllMeta };
