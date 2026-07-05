const express = require("express");
const { getLogs, createLog } = require("../controllers/logsController");

const router = express.Router();

router.get("/logs", getLogs);
router.post("/logs", createLog);

module.exports = router;
