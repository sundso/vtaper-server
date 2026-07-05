const logsService = require("../services/logsService");
const metaService = require("../services/metaService");

// Reset orchestrates both services rather than touching the DB directly.
async function resetAll(req, res) {
  try {
    await logsService.deleteAllLogs();
    await metaService.deleteAllMeta();
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to reset data" });
  }
}

module.exports = { resetAll };
