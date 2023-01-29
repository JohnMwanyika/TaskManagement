const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const prisma = new PrismaClient();
const axiosSendSMS = require("../middlewares/sendSms");
const ajaxSendText = require("../middlewares/sendSms");
const sendSMS = require("../middlewares/sendSms");

module.exports = {
  createNewTeam: async (req, res) => {
    const { userId, projectId } = req.body;
    console.log(req.body);
    const user = await prisma.user.findUnique({
      where: {
        user_id: parseInt(userId),
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
            `Hello ${user.first_name}, ${req.session.user.first_name} has added you to a project login to check`
          )
        )
        .then(res.redirect("back"));
    } else {
      res.json({ message: { info: "This user exists", type: "error" } });
    }
  },
  removeFromTeamById: async (req, res) => {
    // const { userId, projectId } = req.params;
    const { userId, projectId } = req.body;
    console.log('user is',userId)
    console.log('project is',projectId)
    const team = await prisma.team.deleteMany({
      // include: { project: true, userId: true },
      where: {
        projectProject_id: parseInt(projectId),
        userUser_id: parseInt(userId),
      },
    }).then(res.redirect('back'))
    // .then(res.json({message:"confirm user removed from project"}));
    console.log(team)
  },
};
