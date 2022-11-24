const express = require('express');
const router = express.Router();

const { getProfile } = require('../controllers/profile.controller');

router.get('/',getProfile);

module.exports = router;