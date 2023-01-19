const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createNewTeam: async (req, res) => {
    const { userId, projectId } = req.body;
    console.log(req.body);
    // const data = Array.from({length:2}).map(()=>{
    //     userUser_id:userId,
    //     projectProject_id
    // })
    // const existingUser = await prisma.project.findUnique({
    //   include: {
    //     team: {
    //       include: {
    //         userId: {
    //           select: { user_id: true },
    //         },
    //       },
    //     },
    //   },
    //   where: { project_id: parseInt(projectId) },
    // });
    // console.log(existingUser.team.userId);
    // res.json({ project: existingUser.team[0].userId });
    const user = await prisma.team.findMany({
      where: {
        projectProject_id: parseInt(projectId),
        userUser_id: parseInt(userId),
      },
    });
    if (!user) {
      team = await prisma.team.create({
        data: {
          userUser_id: parseInt(userId),
          projectProject_id: parseInt(projectId),
        },
      });
      res.redirect("back");
    } else {
      res.json({ message: "This user already exists in this project" });
    }
  },
};
