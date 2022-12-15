const { PrismaClient } = require("@prisma/client");
var moment = require("moment");
const prisma = new PrismaClient();

module.exports = {
  allProjects: async (req, res) => {
    if (req.session.user) {
      const projects = await prisma.project.findMany({
        include: {
          statusId: true,
          team: {
            include: { userId: true },
          },
        },
      });
      console.log(projects[0].team);
      // console.log(JSON.stringify(projects) )
      res.render("projects", {
        rows: projects,
        bd: "Projects",
        card_title: "My Projects",
        user: req.session.user,
        moment: require("moment"),
      });
    } else {
      res.render("login", { message: "You need to login first" });
    }
  },
  myProjects: async (req, res) => {
    if (req.session.user) {
      const projects = await prisma.project.findMany({
        include: {
          statusId: true,
          team: {
            include: { userId: true },
          },
          task: true,
          created_by:true
        },
        orderBy: {
          projectId:"desc",
        },
      });
      const tasks = await prisma.task.groupBy({
        // where: {
        //   status_id: 2,
        //   user_id:req.session.user.user_id
        // },
        by: ["projectProjectId"],
        _count: {
          task_id: true,
        },
      });
      console.log(projects[0]);
      console.log(tasks);
      res.render("my_projects", {
        bd: "Projects",
        user: req.session.user,
        projects: projects,
      });
    } else {
      res.render("login", { message: "You need to login first" });
    }
  },
  projectForm: (req,res)=>{
    if(req.session.user){
      res.render('project_form',{user:req.session.user})
    }
  }
};
