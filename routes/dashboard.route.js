const express = require("express");
// var session = require('express-session')
const { mainDashboard } = require("../controllers/dashboard.controller");
const router = express.Router();

// var taskRouter = require("./task.route");
// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

router.get("/", mainDashboard);
// router.use("/my_tasks",taskRouter);

module.exports = router;
