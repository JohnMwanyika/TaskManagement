const express = require('express');
const { mainDashboard } = require('../controllers/dashboard.controller');
const router = express.Router();

router.get('/',mainDashboard)

module.exports = router