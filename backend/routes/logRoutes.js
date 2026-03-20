const express = require("express");
const router = express.Router();
const { getLogs, getLogStats } = require("../controllers/logControllers");

router.route("/").get(getLogs);
router.route("/stats").get(getLogStats);

module.exports = router;
