const project = require('../models/projects.models');
const user_project = require('../models/users-projects');
const { addPost } = require('./post.service');

const addProject = async (req, res) => {
    try {
        const newProject = await project.create({
            manager: req.body.manager,
            deadline: req.body.deadline,
            title: req.body.title,
            description: req.body.description,
        });
        const newUserProject = await user_project.create({
            user: req.body.manager,
            project: newProject._id,
        });

        if (!newProject || !newUserProject) {
            return res.status(400).json({ message: 'Project not created' });
        }

        const newPost = await addPost({
            body: {
                creator: req.body.manager,
                title: 'New project',
                content: `You have recently created project ${req.body.title}`,
                project: newProject._id,
                type: 'new project'
            }
        }, res, false);

        if (!newPost) {
            return res.status(400).json({ message: 'Post not created' });
        }

        return res.status(201).json({
            message: 'new project created',
            newProject
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await project.find();
        if (!projects) {
            return res.status(400).json({ message: 'Projects not found' });
        }
        return res.status(200).json({
            message: 'Projects found',
            projects
        });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    addProject,
    getAllProjects,
};