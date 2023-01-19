const router = require("express").Router();
const { createNewTeam } = require("../controllers/team.controller");

router.post('/new_team_members/',createNewTeam)


module.exports = router;
