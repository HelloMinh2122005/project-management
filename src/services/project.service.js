const project = require('../models/projects.models');
const user_project = require('../models/users-projects');
const user = require('../models/users.models');

const addProject = async (req, res) => {
    try {
        const findManager = await user.findOne({ _id: req.body.manager })
        if (!findManager) {
            return res.status(403).json({
                message: 'HOPE IT NOT GO IN HERE'
            })
        }
        const newProject = await project.create(req.body)
        const newProjectUser = await user_project.create({ user: req.body.manager, project: newProject._id })
        return res.status(201).json({
            message: 'new project created',
            newProject,
            newProjectUser
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await project.find().sort({ createdAt: -1 })
        return res.status(200).json({
            message: 'All projects',
            projects
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addProject,
    getAllProjects
}