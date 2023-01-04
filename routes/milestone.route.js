const express = require('express');
const router = express.Router();

const { milestoneForm } = require('../controllers/milestone.controller');

router.get('/new',milestoneForm);

module.exports = router;