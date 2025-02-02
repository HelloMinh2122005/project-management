const project = require('../models/projects.models');
const user_project = require('../models/users-projects');

const addProject = async (req, res) => {
    try {
        const findManager = await user_project.findOne({ user: req.body.manager })
        if (!findManager) {
            return res.status(403).json({
                message: 'Not found manager'
            })
        }
        const newProject = await project.create(req.body)
        const newProjectUser = await user_project.create({ user: req.user._id, project: newProject._id })
        return res.status(201).json({
            message: 'new project created',
            newProject,
            newProjectUser
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addProject
}