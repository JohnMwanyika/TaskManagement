const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
          include:{project:true},
          where: {
            projectProject_id: parseInt(id),
          },
        });
        
        const project = await prisma.project.findUnique({
          where: {
            project_id: parseInt(id),
          },
        })

        console.log(milestones);
        // res.json(milestones);
        res.render("new_milestone",{user:req.session.user, rows:milestones,project})
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
};
