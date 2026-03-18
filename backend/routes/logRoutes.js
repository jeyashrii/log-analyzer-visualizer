const express = require("express");
const { getLogs } = require("../controllers/logControllers");

const router = express.Router();
router.route("/").get(getLogs);

module.exports = router;
