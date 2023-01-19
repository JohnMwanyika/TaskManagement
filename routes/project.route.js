const express = require("express");
const router = express.Router();

const {
  allProjects,
  myProjects,
  projectForm,
  newProject,
  newProjectApi,
} = require("../controllers/project.controller");

// router.get("/", allProjects);
router.get("/", myProjects);
router.get("/new_project/", projectForm);
router.post("/new-project/", newProject);
// This is an ajax post submit for a new project
router.post("/new-project-api/", newProjectApi);


module.exports = router;
