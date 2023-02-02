const express = require("express");
const router = express.Router();

const {
  milestoneForm,
  getMileById,
  createNewMilestone,
  updateById,
  deleteById,
  getMilestoneByIdApi
} = require("../controllers/milestone.controller");

router.get("/new", milestoneForm);
router.get("/:id", getMileById);
router.post("/",createNewMilestone);
router.post("/update_milestone/:id",updateById);
router.delete("/:id",deleteById);
router.get("/api/:id",getMilestoneByIdApi)

module.exports = router;
