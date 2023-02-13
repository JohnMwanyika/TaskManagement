const express = require("express");
const router = express.Router();

const {
  createTask,
  getMyTasks,
  taskForm,
  // activateTask,

  assignTaskForm,
  createAssignmentApi,
  getTaskById,
} = require("../controllers/task.controller");

// router.get('/',getTasks);
router.post("/new_task", createTask);
router.get("/", getMyTasks);
router.get("/new_task", taskForm);
// router.post("/:id", activateTask);
// get the task assign form
router.get("/assign", assignTaskForm);
// assign team member task
router.post("/api/assign",createAssignmentApi)
router.get("/:id", getTaskById);


module.exports = router;
