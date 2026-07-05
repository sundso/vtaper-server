const express = require("express");
const { getMeta, saveMeta } = require("../controllers/metaController");

const router = express.Router();

router.get("/meta", getMeta);
router.post("/meta", saveMeta);

module.exports = router;
