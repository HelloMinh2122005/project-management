const express = require('express');
const router = express.Router();

const TaskService = require('../services/task.service');
const TaskController = require('../controllers/task.controller');

const taskService = new TaskService();
const taskController = new TaskController(taskService);

module.exports = router;