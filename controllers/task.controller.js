const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  createTask: async (req, res) => {
    if (req.session.user) {
      const { title, description, user_id, due_in } = req.body;
      console.log(req.body);
      const result = await prisma.task.create({
        data: {
          title: title,
          description: description,
          user_id: parseInt(user_id),
          due_in: new Date(due_in),
        },
      });
      console.log(result);
      res.redirect("/dashboard/my_tasks");
    } else {
      res.render("login", { messgage: "You need to log in first",user:req.session.user });
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
          where:{
            user_id:req.session.user.user_id
          }
        });
        console.log(req.session.user);
        res.render("my_tasks", {
          rows: results,
          card_title: "My Tasks",
          bd: "My Tasks",
          user: req.session.user,
        });
      } else {
        res.render("login", { message: "You need to login first",user:req.session.user });
      }
    } catch (error) {
      res.render("not-found", { message: error.message, status: error.status });
    }
  },
  taskForm: async (req, res) => {
    try {
      console.log(req.session.user)
      if (req.session.user) {
        const allUsers = await prisma.user.findMany();
        console.log(allUsers);
        res.render("task_form", { rows: allUsers,user:req.session.user  });
      } else {
        res.render("login", { messgage: "You need to log in first"});
      }
    } catch (error) {
      res.render("not-found", { message: error.message, status: error.status });
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
};
