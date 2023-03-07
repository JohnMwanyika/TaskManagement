const express = require("express");
router = express.Router();
const { getRoles } = require("../controllers/role.controller");

// Role Routes
router.get("/add_roles", getRoles);

module.exports = router;