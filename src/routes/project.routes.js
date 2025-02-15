import express from 'express';
const router = express.Router();

import ProjectService from '../services/project.service.js';
import ProjectController from '../controllers/project.controller.js';

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

router.post('/create', projectController.createProject.bind(projectController));
router.get('/all', projectController.getAllProjects.bind(projectController));
router.get('/:id', projectController.getProjectById.bind(projectController));
router.put('/:id', projectController.updateProject.bind(projectController));
router.delete('/:id', projectController.deleteProject.bind(projectController));

export default router;