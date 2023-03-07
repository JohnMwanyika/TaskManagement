const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profile.controller");

router.get("/", getProfile);
router.post("/update_user/:id", updateProfile);
router.post("/change_pass", changePassword);

module.exports = router;
