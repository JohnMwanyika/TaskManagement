const express = require("express");
// var session = require('express-session')
const { mainDashboard } = require("../controllers/dashboard.controller");
const router = express.Router();

var taskRouter = require("./task.route");
var profileRouter = require("./profile.route");
const usersRouter = require('./user.route')
const projectRouter = require('./project.route')
// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

router.get("/", mainDashboard);
router.use("/my_tasks",taskRouter);
router.use("/profile",profileRouter);
router.use('/users',usersRouter);
router.use('/projects',projectRouter)

module.exports = router;
