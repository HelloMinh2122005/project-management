const express = require('express');
const router = express.Router();

const ProjectService = require('../services/project.service');
const ProjectController = require('../controllers/project.controller');

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

module.exports = router;