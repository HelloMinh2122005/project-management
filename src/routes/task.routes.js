import express from 'express';
const router = express.Router();

import TaskService from '../services/task.service.js';
import TaskController from '../controllers/task.controller.js';

const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.post('/', taskController.createTask.bind(taskController)); // checking
router.get('/', taskController.getAllTasks.bind(taskController)); // checking
router.get('/:id', taskController.getTaskById.bind(taskController)); // checking
router.patch('/:id', taskController.updateTask.bind(taskController)); // checking
router.delete('/:id', taskController.deleteTask.bind(taskController)); // checking

export default router;