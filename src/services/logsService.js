const pool = require("../db");

// All DB access for the "logs" table (workout sessions) lives here.

async function getLogs() {
  const result = await pool.query("SELECT * FROM logs ORDER BY date ASC");
  return result.rows;
}

async function addLog({ date, dayType, week, phase, exercises, pump }) {
  const result = await pool.query(
    `INSERT INTO logs (date, day_type, week, phase, exercises, pump)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [date, dayType, week || null, phase || null, exercises || null, pump || null]
  );
  return result.rows[0];
}

async function deleteAllLogs() {
  await pool.query("DELETE FROM logs");
}

module.exports = { getLogs, addLog, deleteAllLogs };
