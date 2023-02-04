const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getProfile: async (req, res) => {
    if (req.session.user) {
      const user = await prisma.user.findUnique({
        include: { role: true, designation: true },
        where: {
          user_id: req.session.user.user_id,
        },
      });
      console.log(user);
      res.render("profile", { user: user });
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  updateProfile: async (req, res) => {
    const { id } = req.params;
    const { fname, lname, username, email, phone } = req.body;

    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(id) },
    });
    console.log("user is :", user);
    if (!user) {
      res.json({ message: { info: "User Not found", type: "error" } });
    } else if (user.user_id != parseInt(id)) {
      res.json({ message: { info: "Invalid userId", type: "error" } });
    } else {
      const userDetails = await prisma.user.update({
        where: { user_id: parseInt(id) },
        data: {
          first_name: fname,
          last_name: lname,
          username: username,
          email: email,
          phone: parseInt(phone),
        },
      });
      console.log("This is user Details " + userDetails);
      console.log("This is req body : ", req.body);
      res.redirect("/dashboard/profile");
      // res.json({ "user Details :": userDetails });
    }
  },
};
