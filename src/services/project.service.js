'use strict'
import Project from '../models/project.model.js';
import User from '../models/user.model.js';

class ProjectService {
    async getProjectById(projectId) {
        return await Project.findById(projectId);
    }

    async getAllProjects() {
        return await Project.find();
    }

    async createProject(project) {
        const newProject = await Project.create(project);
        const owner = await User.findById(newProject.owner);
        if (!owner)
            throw new Error('Owner not found in creating project');
        owner.projects.push(newProject._id);
        await owner.save();
        return newProject;
    }

    async updateProject(projectId, project) {
        return await Project.findByIdAndUpdate(projectId, project, { new: true });
    }

    async deleteProject(projectId) {
        const projectToDelete = await Project.findById(projectId);
        if (!projectToDelete)
            throw new Error('Project not found in deleting project');
        const owner = await User.findById(projectToDelete.owner);
        if (!owner)
            throw new Error('Owner not found in deleting project');
        owner.projects = owner.projects.filter((p) => p.toString() !== projectId);
        await owner.save();
        return await Project.findByIdAndDelete(projectId);
    }
}

export default ProjectService;