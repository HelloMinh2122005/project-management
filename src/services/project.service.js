'use strict'
import project from '../models/project.model.js';

class ProjectService {
    async getProjectById(projectId) {
        return await project.findById(projectId);
    }
}

export default ProjectService;