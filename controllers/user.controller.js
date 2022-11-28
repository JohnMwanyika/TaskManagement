const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const pool = require("../config/database");

module.exports = {
  getUsers: async (req, res) => {
    const allUsers = await prisma.user.findMany({
      include:{
        role:true
      }
    })
    const allRoles = await prisma.role.findMany({
      
    })
    console.log(allUsers)
    console.log(allRoles)
    res.render("manage_users", { title: "Users",rows: allUsers,results: allRoles});
  },
  // serach user
  find: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      let searchTerm = req.body.search;
      connection.query(
        `SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?`,
        ["%" + searchTerm + "%", "%" + searchTerm + "%"],
        (err, rows) => {
          // when done with connection release it
          connection.release();
          if (!err) {
            res.render("users", { rows: rows, title: "Find" });
          } else {
            console.log(err);
            res.render("error", {
              title: "Oops! an error occured",
              error: err,
            });
          }
        }
      );
    });
  },
  // get create_user form
  form: (req, res) => {
    pool.getConnection((err,connection)=>{
      if(err) throw err;
      connection.query(
        `SELECT role_id, role_name FROM role `,
        (err,rows)=>{
          if(!err){
            res.render('addUser',{rows:rows})
          }
        }
      )
    })
  },
  // submit new user
  createUser: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      const newUser = req.body;
      if (newUser === null) {
        console.log("Empty Fields");
      }
      console.log(newUser);
      connection.query(
        `INSERT INTO user SET first_name =?,last_name =?,email =?,password =?,role_id =?`,
        [
          newUser.first_name,
          newUser.last_name,
          newUser.email,
          newUser.password[1],
          newUser.role
        ],
        (err, rows) => {
          connection.release();
          if (!err) {
            res.render("addUser", {
              alert: "user created successfully",
              id: rows.insertedId,
            });
          } else {
            console.log(err);
          }
        }
      );
    });
  },
  // get user by id
  get_userById: async(req, res) => {
    let id = req.params.id
    const user = await prisma.user.findMany({
      include:{
        role:true,
      },
      where:{
        user_id:parseInt(id)
      }
    })
    res.render('view_user',{row:user,title:'View User'});
  },
  // get edit user form by id
  edit_user_form: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        // `SELECT * FROM user WHERE user_id=?`,
        `SELECT user.user_id,user.first_name,user.last_name,user.email,user.password,role.role_name,role.role_id FROM role JOIN user ON user.role_id =role.role_id WHERE user.user_id=?`,
        [req.params.id],
        (err, rows) => {
          connection.release();
          console.log(rows,req.params.id);
          if (!err) {
            res.render("edit_user", { rows: rows });
          } else {
            console.log(err);
          }
        }
      );
    });
  },
  delete_byId: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        `DELETE FROM user WHERE user_id=?`,
        [req.params.id],
        (err, rows) => {
          connection.release();
          console.log(rows);
          if (!err) {
            // res.render("users", { alert: "User deleted successfully" });
            res.redirect("/users");
          } else {
            console.log(err);
          }
        }
      );
    });
  },
  update_byId: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      const newData = req.body;
      connection.query(
        `UPDATE user SET first_name =?,last_name =?,email =? WHERE user_id=?`,
        [
          newData.first_name,
          newData.last_name,
          newData.email,
          req.params.id,
        ],
        (err, rows) => {
          // connection.release();
          if (!err) {
            pool.getConnection((err, connection) => {
              if (err) throw err;

              connection.query(
                `SELECT * FROM user WHERE user_id=?`,
                [req.params.id],
                (err, rows) => {
                  connection.release();
                  console.log(rows);
                  if (!err) {
                    res.render("edit_user", {
                      rows: rows,
                      alert: `${newData.first_name} updated successfully`,
                    });
                  } else {
                    console.log(err);
                  }
                }
              );
            });
          } else {
            console.log(err);
          }
        }
      );
    });
  },
};
