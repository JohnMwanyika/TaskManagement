const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getUsers: async (req, res) => {
    try {
      if (req.session.user) {
        const allUsers = await prisma.user.findMany({
          include: {
            role: true,
          },
        });
        const allRoles = await prisma.role.findMany({});
        console.log(allUsers);
        console.log(allRoles);
        res.render("manage_users", {
          title: "Users",
          rows: allUsers,
          results: allRoles,
          user: req.session.user,
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      return res
        .status(404)
        .render("not_found", { message: error.message, status: error.status });
    }
  },
  // submit new user
  createUser: (req, res) => {
    if (req.session.user) {
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  // get user by id
  get_userById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      if (req.session.user) {
        const user = await prisma.user.findUnique({
          where: { user_id: id },
          include: {
            role: {
              select: { role_name: true },
            },
          },
        });
        console.log(id);
        console.log(user);
        res.render("view_user", {
          row: user,
          title: "View User",
          user: req.session.user,
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      return res
        .status(404)
        .render("not_found", { message: error.message, status: error.status });
    }
  },
  update_byId: async (req, res) => {
    // try {
      if (req.session.user) {
        const id = parseInt(req.params.id);
        const { first_name, last_name, email, role } = req.body;
        const newData = await prisma.user.update({
          where: {
            user_id: id,
          },
          data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            roleRole_id: parseInt(role),
          },
        });
        console.log(newData);
        res.redirect("/dashboard/users");
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    // } catch (error) {
    //   return res.status(404).render("not_found", {
    //     message: error.message,
    //     status: error.status,
    //   });
    // }
  },
};
