const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getUsers: async (req, res) => {
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
      res.render("login", { message: "You need to log in first" });
    }
  },
  // submit new user
  createUser: (req, res) => {
    if (req.session.user) {
    } else {
      res.render("login", { messgage: "You need to log in first" });
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
        res.render("login", { messgage: "You need to log in first" });
      }
    } catch (error) {
      return res
        .status(404)
        .render("not_found", { message: error.message, status: error.status });
    }
  },
  update_byId: async (req, res) => {
    try {
      console.log(req.session.user);
      console.log('Request.body is')
      console.log(req.body);
      if (req.session.user) {
        const id = parseInt(req.params.id) ;
        const { first_name, last_name, email, role } = req.body;
        const newData = await prisma.user.update({
          where: {
            user_id: id,
          },
          data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role_id: parseInt(role)
          },
        });
        console.log(newData);
        res.redirect("/dashboard/users");
      } else {
        res.render("login", { message: "You need to log in first" });
      }
    } catch (error) {
      return res.status(404).render("not_found", {
        message: error.message,
        status: error.status,
      });
    }
  },
};
