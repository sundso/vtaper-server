const express = require("express");
const metaRoutes = require("./meta");
const logsRoutes = require("./logs");
const { resetAll } = require("../controllers/resetController");

const router = express.Router();

router.use(metaRoutes);
router.use(logsRoutes);
router.delete("/reset", resetAll);

module.exports = router;
