const express = require("express");
const router = express.Router();

const {
  milestoneForm,
  getMileById,
  createNewMilestone
} = require("../controllers/milestone.controller");

router.get("/new", milestoneForm);
router.get("/:id", getMileById);
router.post("/",createNewMilestone)

module.exports = router;
