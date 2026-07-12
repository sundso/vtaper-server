const express = require("express");
const { getBodyStats, createBodyStat, deleteBodyStat } = require("../controllers/bodyStatsController");

const router = express.Router();
router.get("/body-stats", getBodyStats);
router.post("/body-stats", createBodyStat);
router.delete("/body-stats/:id", deleteBodyStat);

module.exports = router;
