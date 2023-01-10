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
router.post("/new-project/", newProjectApi);

module.exports = router;
