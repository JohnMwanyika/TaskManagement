const { PrismaClient } = require("@prisma/client");
// const pool = require("../config/database");

const prisma = new PrismaClient();
module.exports = {
  getTasks: async(req, res) => {

    const allTasks = await prisma.task.findMany({
      include:{user:true,task_status:true}
    })
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
    })
    res.render('my_tasks',{rows:results,card_title:'My Tasks',bd:'My Tasks'})
  },
  taskForm:async(req,res)=>{
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
    res.render('task_form',{rows:allUsers})
  },
  newTask: async(req,res)=>{
    const {title,description,user_id,due_in}= req.body;
    const author = await prisma.user.findFirst({
      where:{
        id:parseInt(user_id) 
      }
    })
    console.log(author);
    console.log(req.body);
    const rows = await prisma.task.create({
      data:{
        title:title,
        description:description,
        user_id:user_id,
        due_in:new Date(due_in)
      }
    });
    console.log(rows)
    res.json(rows)
  }

};
