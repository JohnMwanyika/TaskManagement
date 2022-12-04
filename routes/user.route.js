const express = require("express");
// const { router } = require("../app");
const router = express.Router();
const {
  getUsers,
  createUser,
  get_userById,
  edit_user_form,
  update_byId,
} = require("../controllers/user.controller");

// User Routes
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", get_userById);
router.get("/edituser/:id", edit_user_form);
router.post("/update/:id", update_byId);

module.exports = router;
