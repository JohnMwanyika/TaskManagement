const express = require('express');
const router = express.Router();

const { getTasks, createTask, getMyTasks, taskForm, newTask} = require('../controllers/task.controller');

router.get('/',getTasks);
router.post('/new_task',createTask);
router.get('/my_tasks',getMyTasks);
router.get('/new_task',taskForm);
// router.post('/new_task',newTask)

module.exports =router;