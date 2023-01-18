const { PrismaClient } = require("@prisma/client");
var moment = require("moment");

const prisma = new PrismaClient();

module.exports = {
  allProjects: async (req, res) => {
    if (req.session.user) {
      const projects = await prisma.project.findMany({
        include: {
          project_status: true,
          team: {
            include: { userId: true },
          },
        },
      });

      res.render("projects", {
        rows: projects,
        bd: "Projects",
        card_title: "My Projects",
        user: req.session.user,
        moment: require("moment"),
      });
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  myProjects: async (req, res) => {
    if (req.session.user) {
      const projects = await prisma.project.findMany({
        include: {
          project_status: true,
          milestone: true,
          task: true,
          team: {
            include: { userId: true },
          },
          task: true,
          created_by: true,
        },
        where: {
          userUser_id: req.session.user.user_id,
        },
        orderBy: {
          project_id: "desc",
        },
      });
      console.log(projects);
      res.render("my_projects", {
        bd: "Projects",
        user: req.session.user,
        projects: projects,
        title: "My Projects",
      });
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  projectForm: (req, res) => {
    if (req.session.user) {
      res.render("project_form", {
        user: req.session.user,
        title: "New Project",
      });
    }
  },
  newProject: async (req, res) => {
    try {
      const { project_title, start_date, due_date, description } = req.body;

      if (req.session.user) {
        const project = await prisma.project.create({
          include: { created_by: true, milestone: true },
          data: {
            title: project_title,
            start_date: new Date(start_date),
            due_date: new Date(due_date),
            description: description,
            userUser_id: req.session.user.user_id,
          },
        });
        console.log(project);

        res.render("new_milestone", {
          user: req.session.user,
          rows: project.milestone,
          project,
          title: "Add Project Milestone",
        });
      } else {
        res.render("login", {
          message: { info: "You need to login first", type: "error" },
          fire: "fire",
        });
      }
    } catch (error) {
      res.render("not_found", { message: error.message });
    }
  },
  newProjectApi: async (req, res) => {
    try {
      const { project_title, start_date, due_date, description } = req.body;

      if (req.session.user) {
        const project = await prisma.project.create({
          data: {
            title: project_title,
            start_date: new Date(start_date),
            due_date: new Date(due_date),
            description: description,
            userUser_id: req.session.user.user_id,
          },
        });
        console.log(project);
        // res.redirect('/dashboard/projects')
        res.json({
          id: project.project_id,
          message: { info: "Project added successfully", type: "success" },
        });
      } else {
        res.json({
          message: { info: "Seems like your session just ended, login and try again", type: "error" },
        });
        // res.render("login", {
        //   message: { info: "You need to login first", type: "error" },
        // });
      }
    } catch (error) {
      // res.render("not_found", { message: error.message });
      res.json({
        message: { info: error.message, type: "error" },
      });
    }
  },
};
