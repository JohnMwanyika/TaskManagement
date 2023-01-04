const express = require("express");
const router = express.Router();

const {
  allProjects,
  myProjects,
  projectForm,
  newProject,
} = require("../controllers/project.controller");

router.get("/", allProjects);
router.get("/projects", myProjects);
router.get("/new_project", projectForm);
router.post("/new-project", newProject);

module.exports = router;
