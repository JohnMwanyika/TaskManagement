const express = require("express");
const { mainDashboard } = require("../controllers/dashboard.controller");
const router = express.Router();

var taskRouter = require("./task.route");


router.get("/", mainDashboard);
router.use("/my_tasks",taskRouter);

module.exports = router;
