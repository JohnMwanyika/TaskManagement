const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    getProfile:(req,res)=>{
        res.render('profile')
    }
}