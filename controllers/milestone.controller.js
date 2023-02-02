const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

module.exports = {
  milestoneForm: (req, res) => {
    if (req.session.user) {
      res.render("new_milestone", { user: req.session.user });
    } else {
      res.render("login", {
        message: { info: "You need to login first", type: "error" },
        fire: "fire",
      });
    }
  },
  getMileById: async (req, res) => {
    try {
      if (req.session.user) {
        const id = req.params.id;
        const milestones = await prisma.milestone.findMany({
          include: { project: true },
          orderBy: {
            mile_id: "desc",
          },
          where: {
            projectProject_id: parseInt(id),
          },
        });

        const project = await prisma.project.findUnique({
          include: { created_by: true },
          where: {
            project_id: parseInt(id),
          },
        });

        // console.log(milestones);
        // milestones.forEach(mile => {
        //   mydate = mile.start_date;

        //   console.log(moment(mydate).format("YYYY-MM-DD"))
        // });
        // console.log(project);
        // res.json(milestones);
        res.render("new_milestone", {
          user: req.session.user,
          moment: require("moment"),
          rows: milestones,
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
  createNewMilestone: async (req, res) => {
    try {
      if (req.session.user) {
        const { title, description, start_date, due_date, projectId } =
          req.body;
        const milestone = await prisma.milestone.create({
          data: {
            name: title,
            description: description,
            start_date: new Date(start_date),
            due_date: new Date(due_date),
            projectProject_id: parseInt(projectId),
          },
        });
        // res.redirect("back")
        res.json({
          message: { info: "Milestone added successfully", type: "success" },
          rows: milestone,
          fire: "fire",
        });
        console.log(milestone);
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
  updateById: async (req, res) => {
    var id = req.params.id;
    console.log(id);
    const { title, description, start_date, due_date, projectId } = req.body;
    const milestone = await prisma.milestone.update({
      where: {
        mile_id: parseInt(id),
      },
      data: {
        name: title,
        description: description,
        start_date: new Date(start_date),
        due_date: new Date(due_date),
        projectProject_id: parseInt(projectId),
      },
    });
    const project_id = parseInt(projectId);
    res.redirect("/dashboard/milestones/" + project_id);
  },
  deleteById: async (req, res) => {
    try {
      var id = req.params.id;
      // const {projectId} = req.body;
      var milestone = await prisma.milestone.delete({
        where: {
          mile_id: parseInt(id),
        },
      });
      console.log(milestone);
      res.json({
        message: { info: "Milestone deleted successfully", type: "success" },
      });
    } catch (error) {
      res.render("not_found", { message: error.message });
    }
  },
  getMilestoneByIdApi: async (req, res) => {
    const { id } = req.params;

    const milestones = await prisma.milestone
      .findMany({
        where: { mile_id: parseInt(id) },
        include: { task: true },
      })
      // .then(console.log);
      console.log(milestones)
    res.json({ results: milestones });
  },
};
