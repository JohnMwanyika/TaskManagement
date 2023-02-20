const { PrismaClient } = require("@prisma/client");
const { Socket } = require("socket.io");
const prisma = new PrismaClient();
const io = require("../app");

module.exports = {
  mainDashboard: async (req, res) => {
    try {
      // if (req.session.user) {
      // count Active tasks
      const groupActive = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          task_statusStatus_id: 2,
          userUser_id: req.session.user.user_id,
        },
      });
      // Count Completed tasks
      const grpCompleted = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          task_statusStatus_id: 6,
          userUser_id: req.session.user.user_id,
        },
      });
      // Count Pending
      const grpPending = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          task_statusStatus_id: 1,
          userUser_id: req.session.user.user_id,
        },
      });
      // Count Failed
      const grpFailed = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          task_statusStatus_id: 5,
          userUser_id: req.session.user.user_id,
        },
      });
      // Count Overdue
      const grpOverdue = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          task_statusStatus_id: 4,
          userUser_id: req.session.user.user_id,
        },
      });
      // count all tasks
      const grpAll = await prisma.task.aggregate({
        _count: {
          _all: true,
        },
        where: {
          userUser_id: req.session.user.user_id,
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
          userUser_id: req.session.user.user_id,
        },
      });
      // Assigned Tasks
      const assignedTasks = await prisma.task_assignment.findMany({
        include: {
          user: { select: { first_name: true } },
          task: {
            include: {
              task_status: true,
              user: { include: { designation: true } },
            },
          },
        },
        where: {
          userUser_id: req.session.user.user_id,
        },
        orderBy: {
          assignment_id: "desc",
        },
      });
      // console.log(assignedTasks);
      // concatenate user's own task with the assigned and display them in recent task table
      const _ = require("lodash");
      var at = new Array();
      assignedTasks.forEach((task, index) => {
        // console.log("each assigned task", task);
        at[index] = task.task;
      });
      console.log("assigned only", at);
      // console.log("assigned only",assignedTasks[0].task)
      let allMyTasks = _.concat(at, allTasks);
      // console.log("All My Tasks are", allTasks);

      res.render("sub-layout", {
        rows: allMyTasks,
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
        totalPending: grpPending,
        totalFailed: grpFailed,
        totalOverdue: grpOverdue,
        // total Completed Tasks
        totalCompleted: grpCompleted,
        // total tasks of logged in user
        totalTasks: grpAll,
      });

      // } else {
      //   res.render("login", {
      //     message: { info: "You need to login first", type: "error" },
      //     fire: "fire",
      //   });
      // }
    } catch (error) {
      res.render("not_found", { message: error.message });
    }
  },
  statisticsApi: async (req, res) => {
    if (req.session.user) {
      const [myTasks, assignedTasks, activeAss, completedAss, pendingAss] =
        await prisma.$transaction([
          // myTasks
          prisma.task.findMany({
            where: {
              userUser_id: req.session.user.user_id,
            },
          }),
          // assignedTasks
          prisma.task_assignment.findMany({
            include: { user: true, task: true },
            where: {
              userUser_id: req.session.user.user_id,
            },
          }),
          // activeAss
          prisma.task_assignment.findMany({
            select: {
              user: true,
              task: true,
            },
            where: {
              userUser_id: req.session.user.user_id,
            },
          }),
        ]);
      console.log(
        "My Tasks :" + myTasks.length,
        "Assigned :" + assignedTasks.length,
        "Active ass :" + activeAss
      );

      res.json({
        data: {
          myTasks: myTasks,
          assignedTasks: assignedTasks,
          activeAss: activeAss,
        },
      });
    } else {
      res.json({ message: { type: "error", info: "You need to login first" } });
    }
  },
};
