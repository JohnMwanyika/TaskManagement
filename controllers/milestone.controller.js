const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  milestoneForm: (req, res) => {
    if (req.session.user) {
      res.render("new_milestone", { user: req.session.user });
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
};
