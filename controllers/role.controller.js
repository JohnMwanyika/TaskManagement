const pool = require("../../config/database");

module.exports = {
  getRoles: (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(`SELECT * FROM role`, (err, rows) => {
        connection.release();

        if (!err) {
          res.render("addUser", { title: "New User", rows: rows });
        } else {
          console.log(err);
        }
      });
    });
  },
};
