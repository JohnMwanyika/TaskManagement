const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getUsers: async (req, res) => {
    if (req.session.user) {
      const allUsers = await prisma.user.findMany({
        include: {
          role: true,
        }
      });
      const allRoles = await prisma.role.findMany({});
      console.log(allUsers);
      console.log(allRoles);
      res.render("manage_users", {
        title: "Users",
        rows: allUsers,
        results: allRoles,
        user:req.session.user
      });
    } else {
      res.render("login", { message: "You need to log in first" });
    }
  },
  // submit new user
  createUser: (req, res) => {
    if (req.session.user) {
    } else {
      res.render("login", { messgage: "You need to log in first" });
    }
  },
  // get user by id
  get_userById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      if (req.session.user) {
        const user = await prisma.user.findUnique({
          where: { user_id: id },
          include: {
            role: {
              select: { role_name: true },
            },
          },
        });
        console.log(id);
        console.log(user);
        res.render("view_user", { row: user, title: "View User",user:req.session.user });
      } else {
        res.render("login", { messgage: "You need to log in first" });
      }
    } catch (error) {
      return res.status(404).render("not_found",{message:error.message,status:error.status});
    }
  },
  // get edit user form by id
  edit_user_form: (req, res) => {

  },
  update_byId: (req, res) => {
    // pool.getConnection((err, connection) => {
    //   if (err) throw err;

    //   const newData = req.body;
    //   connection.query(
    //     `UPDATE user SET first_name =?,last_name =?,email =? WHERE user_id=?`,
    //     [newData.first_name, newData.last_name, newData.email, req.params.id],
    //     (err, rows) => {
    //       // connection.release();
    //       if (!err) {
    //         pool.getConnection((err, connection) => {
    //           if (err) throw err;

    //           connection.query(
    //             `SELECT * FROM user WHERE user_id=?`,
    //             [req.params.id],
    //             (err, rows) => {
    //               connection.release();
    //               console.log(rows);
    //               if (!err) {
    //                 res.render("edit_user", {
    //                   rows: rows,
    //                   alert: `${newData.first_name} updated successfully`,
    //                 });
    //               } else {
    //                 console.log(err);
    //               }
    //             }
    //           );
    //         });
    //       } else {
    //         console.log(err);
    //       }
    //     }
    //   );
    // });
  },
};
