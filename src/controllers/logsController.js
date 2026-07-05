const logsService = require("../services/logsService");

async function getLogs(req, res) {
  try {
    const logs = await logsService.getLogs();
    res.json(logs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
}

async function createLog(req, res) {
  const { date, dayType } = req.body;
  if (!date || !dayType) return res.status(400).json({ error: "date and dayType are required" });

  try {
    const log = await logsService.addLog(req.body);
    res.json(log);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save log" });
  }
}

module.exports = { getLogs, createLog };
