const { PrismaClient } = require("@prisma/client");
const { createPaginator } = require("prisma-pagination");
const paginate = new createPaginator({ perPage: 10 });
var moment = require("moment");
const { query } = require("express");
const { parse } = require("dotenv");

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
      const users = await prisma.user.findMany({});
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
        // skip: parseInt(req.query.skip) || 0,
        // take: parseInt(9),
        where: {
          userUser_id: req.session.user.user_id,
        },
        orderBy: {
          project_id: "desc",
        },
      });
      // console.log(projects);
      // console.log(users);
      console.log("pages");
      console.log(req.paginate);
      res.render("my_projects", {
        bd: "Projects",
        user: req.session.user,
        projects: projects,
        title: "My Projects",
        users,
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
          include: {
            created_by: true,
            team: { include: { userId: true } },
            milestone: true,
          },
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
          message: {
            info: "Seems like your session just ended, login and try again",
            type: "error",
          },
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
  // load projects and their respective milestones
  projectApi: async (req, res) => {
    try {
      let { id } = req.params;
      const project = await prisma.project
        .findUnique({
          include: { milestone: true },
          where: {
            project_id: parseInt(id),
          },
        })
        .then(console.log());
      console.log(project);
      res.json({
        project: project,
        // milestones:project.milestone
      });
    } catch (error) {
      res.json({
        message: { info: error.message, type: "error" },
      });
    }
  },
};
