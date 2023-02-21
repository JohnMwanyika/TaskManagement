const express = require("express");
const router = express.Router();

const {
  allProjects,
  myProjects,
  projectForm,
  newProject,
  newProjectApi,
  projectApi,
  updateProjectById,
  viewReport,
} = require("../controllers/project.controller");

// router.get("/", allProjects);
router.get("/", myProjects);
router.get("/new_project/", projectForm);
router.post("/new-project/", newProject);
// This is an ajax post submit for a new project
router.post("/new-project-api/", newProjectApi);
router.get("/api/:id", projectApi);
// update project by ID
router.post("/update/:id", updateProjectById);
router.get("/report", viewReport);

module.exports = router;
