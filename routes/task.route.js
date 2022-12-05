const express = require('express');
const router = express.Router();

const {createTask, getMyTasks, taskForm, activateTask, getTaskById} = require('../controllers/task.controller');


// router.get('/',getTasks);
router.post('/new_task',createTask);
router.get('/',getMyTasks);
router.get('/new_task',taskForm);
router.post('/my_task/:id',activateTask);
router.get('/:id',getTaskById)

module.exports = router;