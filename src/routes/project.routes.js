import express from 'express';
const router = express.Router();

import ProjectService from '../services/project.service.js';
import ProjectController from '../controllers/project.controller.js';

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

export default router;