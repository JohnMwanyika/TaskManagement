const express = require("express");
const router = express.Router();
var paginationMiddleware = require("express-pagination-middleware");
var projectPaginationMiddleware = paginationMiddleware({
    sort: {
        validKeys: ["status", "created_by", "team"]
    },
    limit: {
        min: 10,
        max: 500
    }
});
const {
  allProjects,
  myProjects,
  projectForm,
  newProject,
  newProjectApi,
} = require("../controllers/project.controller");

// router.get("/", allProjects);
router.get("/", projectPaginationMiddleware, myProjects);
router.get("/new_project/", projectForm);
router.post("/new-project/", newProject);
// This is an ajax post submit for a new project
router.post("/new-project-api/", newProjectApi);


module.exports = router;
