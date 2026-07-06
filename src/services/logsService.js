const pool = require("../db");

// All DB access for the "logs" table (workout sessions) lives here.

async function getLogs() {
  const result = await pool.query("SELECT * FROM logs ORDER BY date ASC");
  return result.rows;
}

async function addLog({ date, dayType, week, phase, exercises, pump }) {
  // exercises/pump are JSONB. node-postgres binds a JS array as a Postgres
  // array literal (not JSON), so `pump` (an array) must be stringified or the
  // insert fails. Stringify both for consistency.
  const result = await pool.query(
    `INSERT INTO logs (date, day_type, week, phase, exercises, pump)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      date,
      dayType,
      week || null,
      phase || null,
      exercises ? JSON.stringify(exercises) : null,
      pump ? JSON.stringify(pump) : null,
    ]
  );
  return result.rows[0];
}

async function deleteAllLogs() {
  await pool.query("DELETE FROM logs");
}

async function deleteLog(id) {
  const result = await pool.query("DELETE FROM logs WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}

module.exports = { getLogs, addLog, deleteAllLogs, deleteLog };
