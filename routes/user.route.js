const express = require("express");
// const { router } = require("../app");
const router = express.Router();
const {
  getUsers,
  createUser,
  get_userById,
  update_byId,
  // getUsersApi,
} = require("../controllers/user.controller");

// User Routes
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", get_userById);
router.post("/update/:id", update_byId);
// router.get("/", getUsersApi);

module.exports = router;
