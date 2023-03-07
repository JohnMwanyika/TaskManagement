const express = require("express");
router = express.Router();
const { getSettings } = require("../controllers/settings.controller");

// settings Routes
router.get('/',getSettings)

module.exports = router;