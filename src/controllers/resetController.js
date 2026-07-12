const logsService = require("../services/logsService");
const metaService = require("../services/metaService");
const bodyStatsService = require("../services/bodyStatsService");

// Reset orchestrates all services rather than touching the DB directly.
async function resetAll(req, res) {
  try {
    await logsService.deleteAllLogs();
    await metaService.deleteAllMeta();
    await bodyStatsService.deleteAllBodyStats();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to reset data" });
  }
}

module.exports = { resetAll };
