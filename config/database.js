require('dotenv').config();
const { createPool } = require('mysql')

const pool = createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
  },(err)=>{
    if(!err){
        console.log('Database connected successfully')
    }
  })


module.exports = pool;