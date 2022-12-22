const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var Swal = require("sweetalert2");
// const { mainDashboard } = require("./dashboard.controller");
module.exports = {
  loginForm: (req, res) => {
    sess = req.session;
    console.log(sess);
    res.render("login", {});
  },
  signUp: async (req, res) => {
    // try {
      const { first_name, last_name, email, username } = req.body;
      var pass = req.body.password;

      let userExists = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      console.log(userExists);
      if (userExists) {
        res.status(401).render("sign_up", {
          message: {
            info: "username taken try another note you can add numbers",
            type: "warning",
          },
        });
        return;
      }

      pass = bcrypt.hashSync(pass, 10);
      let user = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password: pass,
          // roleRole_id: 2,
        },
      });
      console.log(user.password);
      res.render("login", {
        message: {
          info: `User ${user.first_name} created successfully`,
          type: "success",
        },
        fire: "fire",
      });
    // } catch (err) {
    //   return res.status(401).render("sign_up", {
    //     message: { info: "Oops!! sorry cant reach database", type: "error" },
    //     fire: "fire",
    //   });
    // }
  },
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      // check if user exists
      let user = await prisma.user.findUnique({
        include: { role: true },
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.status(401).render("login", {
          message: {
            info: "No user with the supplied username",
            type: "error",
          },
          fire: "fire",
        });
      }

      //   compare passswords
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result) {
          if (password == "1234") {
            req.session.pass = password;
            // res.redirect("/dashboard");
          }
          // console.log(user.push({pass:req.body}))
          req.session.user = user;
          console.log(req.session.user, req.session.pass);
          // return res.status(200).redirect("/dashboard");
          return res.status(200).redirect("/dashboard");
        } else {
          return res.render("login", {
            Swal: require("sweetalert2"),
            message: { info: "Invalid Credentials", type: "alert-danger" },
            fire: "fire",
          });
        }
      });
    } catch (error) {
      res.status(401).render("login", {
        message: { info: error.message, type: "error" },
        Swal: require("sweetalert2"),
        fire: "fire",
      });
    }
  },
  signOut: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      console.log(req.session);
      res.redirect("/");
    });
  },
};
