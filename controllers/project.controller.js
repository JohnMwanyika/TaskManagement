const { PrismaClient } = require("@prisma/client");
var moment = require("moment");
const prisma = new PrismaClient();

module.exports = {
  allProjects: async (req, res) => {
    if (req.session.user) {
      const projects = await prisma.project.findMany({
        include: {
          statusId: true,
          team:{
            include:{userId:true}
          }
        },
      });
      console.log(projects[0].team)
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
};
