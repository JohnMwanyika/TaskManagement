const express = require("express");

const {
  mainDashboard,
  statisticsApi,
} = require("../controllers/dashboard.controller");
// const {  } = require("../middlewares/loggedInStatus");

const router = express.Router();

var taskRouter = require("./task.route");
var profileRouter = require("./profile.route");
const usersRouter = require("./user.route");
const projectRouter = require("./project.route");
const milestoneRouter = require("./milestone.route");
const teamRouter = require("./team.route");
const checkLogin = require("../middlewares/loggedInStatus");

// router.use((req, res, next) => {
//   if (!req.session.user) {
//     res.render("login", {
//       message: { info: "Seems like your session just ended!!", type: "error" },
//       fire: "fire",
//     });
//   } else {
//     next();
//   }
// });
router.use(checkLogin);

router.get("/", mainDashboard);
// statistics API
router.get("/api", statisticsApi);

router.use("/my_tasks", taskRouter);
router.use("/profile", profileRouter);
router.use("/users", usersRouter);
router.use("/projects", projectRouter);
router.use("/milestones", milestoneRouter);
router.use("/team", teamRouter);

module.exports = router;
