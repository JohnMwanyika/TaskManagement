const { PrismaClient } = require("@prisma/client");
// const pool = require("../config/database");

const prisma = new PrismaClient();
module.exports = {
  getTasks: async(req, res) => {

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
              card_title:'Recent Tasks'
            });
  },
  createTask: async(req, res) => {
    const { title, description, user_id, due_in} = req.body
    console.log(req.body)

    const result = await prisma.task.create({
      data:{
        title:title,
        description:description,
        user_id:parseInt(user_id),
        due_in:new Date(due_in)
      }
    });

    res.redirect('/my_tasks')
  },
  getMyTasks: async(req,res)=>{
    const results = await prisma.task.findMany({
      include:{user:true,task_status:true},
      orderBy:{
        task_id:'desc'
      }
    })
    res.render('my_tasks',{rows:results,card_title:'My Tasks',bd:'My Tasks'})
  },
  taskForm:async(req,res)=>{
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.render('task_form',{rows:allUsers})
  },
  activateTask: async(req,res)=>{
    const id = req.params.user_id
    console.log(id);
    res.json(id);
    // const result = await prisma.task.update({
    //   where:{id:id}
    // })
  }

};
