const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { mainDashboard } = require("./dashboard.controller");
module.exports = {
  loginForm: (req, res) => {
    session = req.session;
    if (session.userid) {
      res.send("Welcome User <a href='/logout'>click to logout</a>");
    } else res.render("login");
  },
  signUp: async (req, res) => {
    try {
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
          message: "username taken try another note you can add numbers",
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
          role_id: 2,
        },
      });
      console.log(user.password);
      res.render("login", {
        message: `User ${user.first_name} created successfully`,
      });
    } catch (err) {
      return res.status(401).render("sign_up", { mesage: err.mesage });
    }
  },
  signIn: async (req, res) => {
    try {
      const { username, password } = req.body;
      // check if user exists
      let user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res
          .status(401)
          .render("login", { message: "No user with the supplied username" });
      }
      console.log(user.password)
    //   compare passswords
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            return res.status(200).redirect('/dashboard')
        }else{
            return res.status(401).render('login',{ message: "Invalid Credentials" });
        }
    })
    } catch (error) {
        res.status(401).render('login',{mesage:err.message})
    }
  },
};
