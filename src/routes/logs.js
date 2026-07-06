const express = require("express");
const { getLogs, createLog, deleteLog } = require("../controllers/logsController");

const router = express.Router();

router.get("/logs", getLogs);
router.post("/logs", createLog);
router.delete("/logs/:id", deleteLog);

module.exports = router;
