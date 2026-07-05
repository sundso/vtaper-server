const express = require("express");
const pool = require("../db");

const router = express.Router();

// --- Meta (program start date) ---

router.get("/meta", async (req, res) => {
  try {
    const result = await pool.query("SELECT start_date FROM meta ORDER BY id DESC LIMIT 1");
    res.json(result.rows[0] || null);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch meta" });
  }
});

router.post("/meta", async (req, res) => {
  const { startDate } = req.body;
  if (!startDate) return res.status(400).json({ error: "startDate is required" });

  try {
    await pool.query("DELETE FROM meta");
    await pool.query("INSERT INTO meta (start_date) VALUES ($1)", [startDate]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save meta" });
  }
});

// --- Logs (workout sessions) ---

router.get("/logs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM logs ORDER BY date ASC");
    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

router.post("/logs", async (req, res) => {
  const { date, dayType, week, phase, exercises, pump } = req.body;
  if (!date || !dayType) return res.status(400).json({ error: "date and dayType are required" });

  try {
    const result = await pool.query(
      `INSERT INTO logs (date, day_type, week, phase, exercises, pump)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [date, dayType, week || null, phase || null, exercises || null, pump || null]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save log" });
  }
});

// --- Reset everything ---

router.delete("/reset", async (req, res) => {
  try {
    await pool.query("DELETE FROM logs");
    await pool.query("DELETE FROM meta");
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to reset data" });
  }
});

module.exports = router;
