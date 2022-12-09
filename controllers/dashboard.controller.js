const { PrismaClient } = require("@prisma/client");
// var session = require("express-session");
const prisma = new PrismaClient();
module.exports = {
  mainDashboard: async (req, res) => {
    try {
      if (req.session.user) {
        // count Actove tasks
        const groupActive = await prisma.task.aggregate({
          _count: {
            status_id: true
          },
          where: {
            status_id: 1,
            user_id:req.session.user.user_id
          },
        });
        // Count Completed tasks
        const grpCompleted = await prisma.task.aggregate({
          _count: {
            status_id: true,
          },
          where: {
            status_id: 2,
            user_id:req.session.user.user_id
          },
        });
        // count all tasks
        const grpAll = await prisma.task.aggregate({
          _count: {
            task_id: true,
          },
          where: {
            user_id: req.session.user.user_id,
          },
        });
        console.log(grpAll);
        // get all tasks
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
          pass: req.session.pass,
          // shows the sign in toast
          toast: "fire",
          // requires moment in the rendered template
          moment: require("moment"),
          // total Active Tasks
          totalActive: groupActive,
          // total Completed Tasks
          totalCompleted: grpCompleted,
          // total tasks of logged in user
          totalTasks:grpAll
        });
      } else {
        res.render("login", { message: "You need to login first" });
      }
    } catch (error) {
      res.render("not_found", { message: error.message });
    }
  },
};
