var express = require("express");
// import all routers
const dashboardRoute = require("./dashboard.route");
// const usersRouter = require('./user.route')

const {
  loginForm,
  signUp,
  signIn,
  signOut,
  signInApi,
} = require("../controllers/login.controller");
var router = express.Router();

router.get("/", loginForm);
router.get("/sign_up", (req, res) => {
  res.render("sign_up");
});
router.post("/sign_up", signUp);
router.post("/login", signIn);
router.get("/logout", signOut);
router.post("/api/signIn", signInApi);

// dashboard routes
router.use("/dashboard", dashboardRoute);
// router.use('/users',usersRouter)
module.exports = router;
