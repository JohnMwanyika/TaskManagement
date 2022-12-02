var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecretjohnmwanyikalovesvee",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
const myusername = "admin";
const mypassword = "1234";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("assets", express.static("/public/assets/"));

var usersRouter = require("./routes/user.route");
const dashboardRoute = require("./routes/dashboard.route");
const loginRouter = require("./routes/login.route");
app.use("/users", usersRouter);
app.use("/dashboard", dashboardRoute);
app.use('/',loginRouter);
// app.get("/", (req, res) => {
//   session = req.session;
//   if (session.userid) {
//     res.send("Welcome User <a href='/logout'>click to logout</a>");
//   } else res.render("login");
// });
// app.post('/login',(req,res)=>{
//   const username = req.body.username
//   const password = req.body.password
//   console.log(req.body)
//   if(username == myusername && password == mypassword){
//       session = req.session;
//       session.userid = username;
//       console.log(req.session);
//       res.render('/dashboard',{message:`Welcome ${username}`})
//   }else{
//       res.render('login',{message:'Invalid Username or Password'})
//   }
// })

// app.get('/logout',(req,res)=>{
//   res.render('logout')
// })
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
