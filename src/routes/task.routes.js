import express from 'express';
const router = express.Router();

import TaskService from '../services/task.service.js';
import TaskController from '../controllers/task.controller.js';

const taskService = new TaskService();
const taskController = new TaskController(taskService);

export default router;