const bodyStatsService = require("../services/bodyStatsService");

async function getBodyStats(req, res) {
  try {
    const stats = await bodyStatsService.getBodyStats();
    res.json(stats);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch body stats" });
  }
}

async function createBodyStat(req, res) {
  const { date, weight, bodyFat, muscleMass } = req.body;
  if (!date) return res.status(400).json({ error: "date is required" });
  if (weight == null && bodyFat == null && muscleMass == null) {
    return res.status(400).json({ error: "at least one of weight, bodyFat, muscleMass is required" });
  }
  try {
    const stat = await bodyStatsService.addBodyStat(req.body);
    res.json(stat);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save body stat" });
  }
}

async function deleteBodyStat(req, res) {
  const { id } = req.params;
  try {
    const deleted = await bodyStatsService.deleteBodyStat(id);
    if (!deleted) return res.status(404).json({ error: "Body stat not found" });
    res.json(deleted);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete body stat" });
  }
}

module.exports = { getBodyStats, createBodyStat, deleteBodyStat };
