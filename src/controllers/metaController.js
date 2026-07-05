const metaService = require("../services/metaService");

async function getMeta(req, res) {
  try {
    const meta = await metaService.getLatestMeta();
    res.json(meta);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch meta" });
  }
}

async function saveMeta(req, res) {
  const { startDate } = req.body;
  if (!startDate) return res.status(400).json({ error: "startDate is required" });

  try {
    await metaService.setMeta(startDate);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save meta" });
  }
}

module.exports = { getMeta, saveMeta };
