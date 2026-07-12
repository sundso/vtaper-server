const pool = require("../db");
// All DB access for the "body_stats" table (weekly weight/body-fat/muscle-mass) lives here.

async function getBodyStats() {
  const result = await pool.query("SELECT * FROM body_stats ORDER BY date ASC");
  return result.rows;
}

async function addBodyStat({ date, weight, bodyFat, muscleMass }) {
  const result = await pool.query(
    `INSERT INTO body_stats (date, weight, body_fat, muscle_mass)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [date, weight ?? null, bodyFat ?? null, muscleMass ?? null]
  );
  return result.rows[0];
}

async function deleteAllBodyStats() {
  await pool.query("DELETE FROM body_stats");
}

async function deleteBodyStat(id) {
  const result = await pool.query("DELETE FROM body_stats WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}

module.exports = { getBodyStats, addBodyStat, deleteAllBodyStats, deleteBodyStat };
