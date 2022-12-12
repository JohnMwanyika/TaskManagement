const express = require("express");
const router = express.Router();

const { allProjects } = require("../controllers/project.controller");

router.get("/",allProjects);
router.post("/new_project", );


module.exports = router
