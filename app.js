var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("assets", express.static("/public/assets/"));
// app.use("jquery", express.static("/public/javascripts/"));

var dashboardRouter = require("./routes/dashboard.route")
var usersRouter = require("./routes/user.route");
var taskRouter = require("./routes/task.route");
var profileRouter = require("./routes/profile.route");
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRouter);
app.use('/tasks',taskRouter)
app.get('/',(req,res)=>{
  res.render('login');
});
app.get('/sign_up',(req,res)=>{
  res.render('sign_up');
});
app.use("/profile", profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
