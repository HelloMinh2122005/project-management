'use strict'
import project from '../models/project.model.js';

class ProjectService {
    async getProjectById(projectId) {
        return await project.findById(projectId);
    }

    async getAllProjects() {
        return await project.find();
    }

    async createProject(project) {
        return await project.create(project);
    }

    async updateProject(projectId, project) {
        return await project.findByIdAndUpdate(projectId, project, { new: true });
    }

    async deleteProject(projectId) {
        return await project.findByIdAndDelete(projectId);
    }
}

export default ProjectService;