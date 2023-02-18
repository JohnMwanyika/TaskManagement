const { PrismaClient } = require("@prisma/client");
var moment = require("moment");
const prisma = new PrismaClient();
module.exports = {
  createTask: async (req, res) => {
    if (req.session.user) {
      const {
        title,
        description,
        mileId,
        projectId,
        start_date,
        userId,
        due_in,
      } = req.body;
      console.log(req.body);
      const result = await prisma.task.create({
        data: {
          title: title,
          description: description,
          milestoneMile_id: parseInt(mileId),
          projectProject_id: parseInt(projectId),
          start_date: new Date(start_date),
          userUser_id: parseInt(req.session.user.user_id),
          due_date: new Date(due_in),
        },
      });
      console.log(result);
      res.redirect("/dashboard/my_tasks");
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  getMyTasks: async (req, res) => {
    try {
      if (req.session.user) {
        const results = await prisma.task.findMany({
          include: { user: true, task_status: true },
          orderBy: {
            task_id: "desc",
          },
          where: {
            userUser_id: req.session.user.user_id,
          },
        });
        console.log(req.session.user);
        res.render("my_tasks", {
          rows: results,
          card_title: "My Tasks",
          bd: "My Tasks",
          user: req.session.user,
          moment: require("moment"),
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      res.render("not_found", { message: error.message, status: error.status });
    }
  },
  taskForm: async (req, res) => {
    try {
      // console.log(req.session.user);
      if (req.session.user) {
        const allUsers = await prisma.user.findMany();
        const userProjects = await prisma.user.findUnique({
          include: { project: true },
          where: { user_id: parseInt(req.session.user.user_id) },
        });
        // console.log(userProjects.project);
        res.render("task_form", {
          rows: allUsers,
          user: req.session.user,
          projects: userProjects.project,
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      res.render("not_found", { message: error.message, status: error.status });
    }
  },
  activateTask: async (req, res) => {
    const id = req.params.user_id;
    console.log(id);
    res.json(id);
    // const result = await prisma.task.update({
    //   where:{id:id}
    // })
  },
  getTaskById: async (req, res) => {
    try {
      if (req.session.user) {
        const id = parseInt(req.params.id);
        const task = await prisma.task.findUnique({
          include: {
            user: true,
            task_status: true,
          },
          where: {
            task_id: id,
          },
        });
        console.log(moment(task.created_at).format("MMM Do YY"));
        res.render("view_task", {
          user: req.session.user,
          task: task,
          moment: require("moment"),
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      res.render("not_found", { message: error.message, status: error.status });
    }
  },
  assignTaskForm: async (req, res) => {
    try {
      if (req.session.user) {
        // const all = await prisma.task.findMany({
        //   include: { user: true },
        //   where: {
        //     user_id:parseInt(req.session.user.user_id),
        //   },
        // });
        const userProjects = await prisma.user.findUnique({
          include: {
            project: {
              include: { task: true },
            },
          },
          where: { user_id: parseInt(req.session.user.user_id) },
        });
        // console.log(tasks);
        res.render("assign_task", {
          user: req.session.user,
          title: "Assign Task",
          // tasks: tasks,
          projects: userProjects.project,
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      res.render("not_found", { message: error.message, status: error.status });
    }
  },
  createAssignmentApi: async (req, res) => {
    const { taskId, userId } = req.body;
    // Check if task is already assigned to the selected
    const checkAssignment = await prisma.task_assignment.findMany({
      where: {
        AND: [
          { taskTask_id: parseInt(taskId) },
          { userUser_id: parseInt(userId) },
        ],
      },
    });
    // .then(console.log);
    console.log("assignement is :", checkAssignment);
    // assign the task if it is not assigned to the selected user
    if (checkAssignment == '') {
      const assignment = await prisma.task_assignment.create({
        data: {
          taskTask_id: parseInt(taskId),
          userUser_id: parseInt(userId),
        },
      });
      // console.log(assignment);
      // res.redirect("back");
      res.json({
        message: { info: "Task assigned successfully", type: "success" },
      });
    } else {
      res.json({
        message: { info: "Task already assigned to this user", type: "error" },
      });
    }
  },
};

// Reusale Code
// try {
//   if(req.session.user){

//   }else{
//     res.render("login", { messgage: "You need to log in first" });
//   }
// } catch (error) {
//   res.render("not_found", { message: error.message, status: error.status });
// }
