'use strict'

class ProjectController {
    constructor(projectService) {
        this.ProjectService = projectService;
    }

    async createProject(req, res) {
        try {
            const newProject = await this.ProjectService.createProject(req.body);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllProjects(req, res) {
        try {
            const projects = await this.ProjectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProjectById(req, res) {
        try {
            const project = await this.ProjectService.getProjectById(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProject(req, res) {
        try {
            const updatedProject = await this.ProjectService.updateProject(req.params.id, req.body);
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProject(req, res) {
        try {
            const deletedProject = await this.ProjectService.deleteProject(req.params.id);
            res.status(200).json(deletedProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default ProjectController;