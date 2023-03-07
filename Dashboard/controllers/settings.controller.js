const pool = require("../../config/database");

module.exports = {
  getSettings: (req, res) => {
    res.render("settings/settings");
  },
};
