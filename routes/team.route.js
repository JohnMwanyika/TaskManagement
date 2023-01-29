const router = require("express").Router();
const { createNewTeam, removeFromTeamById } = require("../controllers/team.controller");

router.post('/new_team_members/',createNewTeam)
router.post('/remove_member/',removeFromTeamById)


module.exports = router;
