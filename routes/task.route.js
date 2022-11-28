const express = require('express');
const router = express.Router();

const {createTask, getMyTasks, taskForm, activateTask} = require('../controllers/task.controller');


// router.get('/',getTasks);
router.post('/new_task',createTask);
router.get('/',getMyTasks);
router.get('/new_task',taskForm);
router.post('/my_task/:id',activateTask);

module.exports =router;