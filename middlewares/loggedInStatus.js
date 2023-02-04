// const express = require('express');
const checkLogin = function (req, res, next) {
  if (!req.session.user) {
    res.render("login", {
      message: {
        info: "Looks like your session just ended, sign in to continue",
        type: "error",
      },
      fire: "fire",
    });
  }
  next();
};

module.exports = checkLogin;
