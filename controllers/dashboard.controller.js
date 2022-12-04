const { PrismaClient } = require("@prisma/client");
// var session = require("express-session");
const prisma = new PrismaClient();
module.exports = {
  mainDashboard: async (req, res) => {
    try {
      if (req.session.user) {
        const allTasks = await prisma.task.findMany({
          include: { user: true, task_status: true },
          orderBy: {
            task_id: "desc",
          },
          where: {
            user_id: req.session.user.user_id,
          },
        });

        res.render("sub-layout", {
          rows: allTasks,
          bd: "Dashboard",
          card_title: "Recent Tasks",
          user: req.session.user,
          toast:'fire'
        });
      } else {
        res.render("login", { message: "You need to login first" });
      }
    } catch (error) {
      res.render("not found", { message: error.message });
    }
  },
};
