const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getProfile: (req, res) => {
    if (req.session.user) {
      res.render("profile",{user:req.session.user});
    } else {
      res.render("login", { message: "You need to log in first" });
    }
  },
};
