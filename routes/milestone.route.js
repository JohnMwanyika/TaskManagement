const express = require("express");
const router = express.Router();

const {
  milestoneForm,
  getMileById,
} = require("../controllers/milestone.controller");

router.get("/new", milestoneForm);
router.get("/:id", getMileById);

module.exports = router;
