const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const prisma = new PrismaClient();
const axiosSendSMS = require("../middlewares/sendSms");

module.exports = {
  createNewTeam: async (req, res) => {
    const { userId, projectId } = req.body;
    console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        user_id: parseInt(userId),
      },
    });
    // get project Name
    const projectTitle = await prisma.project.findUnique({
      select: { title: true },
      where: {
        project_id: parseInt(projectId),
      },
    });
    const existingUser = await prisma.team.findMany({
      include: { project: true, userId: true },
      where: {
        projectProject_id: parseInt(projectId),
        userUser_id: parseInt(userId),
      },
    });
    // console.log(existingUser);
    if (existingUser == "") {
      const team = await prisma.team
        .create({
          data: {
            userUser_id: parseInt(userId),
            projectProject_id: parseInt(projectId),
          },
        })
        .then(
          axiosSendSMS(
            user.phone,
            `Hello ${user.first_name}, ${req.session.user.first_name} has added you to ${projectTitle.title} project, login to check your tasks`
          )
        )
        .then(res.redirect("../../projects"));
    } else {
      res.json({ message: { info: "This user exists", type: "error" } });
    }
  },
  removeFromTeamById: async (req, res) => {
    // const { userId, projectId } = req.params;
    const { user, project } = req.body;
    // get the name of removed user
    const removedUser = await prisma.user.findUnique({
      select: { first_name: true, phone: true },
      where: {
        user_id: parseInt(user),
      },
    });
    // get project Name
    const projectTitle = await prisma.project.findUnique({
      select: { title: true },
      where: {
        project_id: parseInt(project),
      },
    });

    console.log("user is", user);
    console.log("project is", project);
    // remove user from selected project
    const team = await prisma.team
      .deleteMany({
        // include: { project: true, userId: true },
        where: {
          projectProject_id: parseInt(project),
          userUser_id: parseInt(user),
        },
      })
      .then(
        axiosSendSMS(
          removedUser.phone,
          `Hello ${removedUser.first_name} ${req.session.user.first_name} removed you from the ${projectTitle.title} project`
        )
      )
      .then(res.redirect("back"));
    // .then(res.json({message:"confirm user removed from project"}));
    console.log(team);
  },
};
