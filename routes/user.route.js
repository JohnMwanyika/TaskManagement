const express = require("express");
// const { router } = require("../app");
const router = express.Router();
const {
  getUsers,
  createUser,
  get_userById,
  update_byId,
} = require("../controllers/user.controller");

// User Routes
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", get_userById);
router.post("/update/:id", update_byId);

module.exports = router;
