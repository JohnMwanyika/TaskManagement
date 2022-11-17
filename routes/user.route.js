const express = require("express");
router = express.Router();
const {
  getUsers,
  find,
  form,
  createUser,
  get_userById,
  edit_user_form,
  delete_byId,
  update_byId,
} = require("../controllers/user.controller");

// User Routes
router.get("/", getUsers);
router.post("/find", find);
router.get("/add_user", form);
router.post("/", createUser);
router.get("/:id", get_userById);
router.get("/edituser/:id", edit_user_form);
router.get("/delete/:id", delete_byId);
router.post("/update/:id", update_byId);





module.exports = router;
