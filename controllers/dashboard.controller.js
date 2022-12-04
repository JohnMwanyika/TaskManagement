const { PrismaClient } = require("@prisma/client");
// var session = require("express-session");
const prisma = new PrismaClient();
module.exports = {
  mainDashboard: async (req, res) => {
    const allTasks = await prisma.task.findMany({
      include: { user: true ,task_status:true},
      orderBy: {
        task_id: "desc",
      },
      where:{
        user_id:1
      }
    });
    // var user = req.session.user;
    
    console.log(allTasks,req.session.user);
    // console.log('My Query '+ req.query.name);
    res.render("index", {
      rows: allTasks,
      bd: "Dashboard",
      card_title: "Recent Tasks",
      user:req.session.user
    });
  },
};
