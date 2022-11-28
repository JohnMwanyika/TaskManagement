const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
    mainDashboard:async(req,res)=>{
        const allTasks = await prisma.task.findMany({
            include:{user:true,task_status:true},
            orderBy:{
              task_id:'desc'
            }
          });
          console.log(allTasks)
          res.render("index", {
                    rows: allTasks,
                    bd:'Dashboard',
                    card_title:'Recent Tasks',
                  });
    }
}
