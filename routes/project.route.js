const express = require("express");
const router = express.Router();
const { createPaginator } = require("prisma-pagination");

const pagination = (req, res, next) => {
  req.paginate = createPaginator({ page: req.query.page, perPage: 10 });
  next();
};
const {
  allProjects,
  myProjects,
  projectForm,
  newProject,
  newProjectApi,
  projectApi,
  viewReport,
} = require("../controllers/project.controller");

router.use(pagination);
// router.get("/", allProjects);
router.get("/", myProjects);
router.get("/new_project/", projectForm);
router.post("/new-project/", newProject);
// This is an ajax post submit for a new project
router.post("/new-project-api/", newProjectApi);
router.get("/api/:id", projectApi);
router.get("/report", viewReport);

module.exports = router;
