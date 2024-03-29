var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const http = require("http");
// require socket io
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = socketio(server);

// const oneDay = 1000 * 60 * 60 * 24;
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("assets", express.static("/public/assets/"));

app.use(
  session({
    secret: "thisismysecretjohnmwanyikalovesvee",
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    // cookie: { maxAge: 100000 },
    resave: false,
  })
);
const loginRouter = require("./routes/login.route");
app.use("/", loginRouter);

const reportingApp = express();
app.use("/reporting", reportingApp);

// const jsreport = require('j')

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

// io.on("connection", (socket) => {
//   console.log("A user just logged in");
//   socket.on("taskForm", (msg) => {
//     console.log("Server says", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user just logged out");
//   });
// });
// module.exports = {io};
const socketIoObject = io;
module.exports.ioObject = socketIoObject;

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running at port:${PORT}`);
});
