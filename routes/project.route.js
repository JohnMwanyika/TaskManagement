const express = require("express");
const router = express.Router();

const { allProjects, myProjects } = require("../controllers/project.controller");

router.get("/",allProjects);
router.get('/projects',myProjects)
router.post("/new_project", );


module.exports = router
