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

    const existingUser = await prisma.team.findMany({
      include: { project: true, userId: true },
      where:{projectProject_id:parseInt(projectId),userUser_id:parseInt(userId)}
    });
    console.log(existingUser);
    if(existingUser == ''){
      const team = await prisma.team.create({
        data:{
          userUser_id: parseInt(userId),
          projectProject_id: parseInt(projectId),
        }
      }).then(res.redirect('back'))
    }else{
      res.json({message:{info:'This user exists',type:'error'}})
    }
  },
};
