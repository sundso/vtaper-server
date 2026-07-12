const express = require("express");
const metaRoutes = require("./meta");
const logsRoutes = require("./logs");
const bodyStatsRoutes = require("./bodyStats");
const { resetAll } = require("../controllers/resetController");

const router = express.Router();

router.use(metaRoutes);
router.use(logsRoutes);
router.use(bodyStatsRoutes);
router.delete("/reset", resetAll);

module.exports = router;
