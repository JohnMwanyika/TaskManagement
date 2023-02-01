const express = require("express");
const { mainDashboard } = require("../controllers/dashboard.controller");
// const { islogedIn } = require("../middlewares/loggedInStatus");
const router = express.Router();

var taskRouter = require("./task.route");
var profileRouter = require("./profile.route");
const usersRouter = require("./user.route");
const projectRouter = require("./project.route");
const milestoneRouter = require("./milestone.route");
const teamRouter = require("./team.route");

// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

router.use((req, res, next) => {
  if (!req.session.user) {
    res.render("login", {
      message: { info: "Seems like your session just ended!!", type: "error" },
      fire: "fire",
    });
  } else {
    next();
  }
});
// router.use(islogedIn);


router.get("/", mainDashboard);
router.use("/my_tasks", taskRouter);
router.use("/profile", profileRouter);
router.use("/users", usersRouter);
router.use("/projects", projectRouter);
router.use("/milestones", milestoneRouter);
router.use("/team", teamRouter);

module.exports = router;
