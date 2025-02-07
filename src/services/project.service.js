const project = require('../models/projects.models');
const user_project = require('../models/users-projects');
const { addPost, updatePost } = require('./post.service');
const { getProjectByManager, getProjectByMember, getAllMembersByIdProject } = require('./helpers/project-helper');

// get by id, get by manager, get by member

const addProject = async (req, res) => {
    try {
        const newProject = await project.create({
            manager: req.body.manager,
            deadline: req.body.deadline,
            title: req.body.title,
            description: req.body.description,
        });

        // add manager
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

const updateProject = async (req, res) => {
    try {
        const updatedProject = await project.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(400).json({ message: 'Project not found' });
        }

        const updatedPost = await updatePost({
            body: {
                creator: req.body.manager,
                title: 'Project updated',
                content: `You have recently updated project ${req.body.title}`,
                project: updatedProject._id,
                image: req.body.image,
                task: req.body.task,
                friend: req.body.friend,
                manager: req.body.manager,
                member: req.body.member,
                type: 'updated project'
            }
        }, res, false);

        if (!updatedPost) {
            return res.status(400).json({ message: 'Post not updated' });
        }

        return res.status(200).json({
            message: 'Project updated',
            updatedProject
        });
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await project.findByIdAndDelete(req.body._id);
        if (!deletedProject) {
            return res.status(400).json({ message: 'Project not found' });
        }

        const updatedPost = await updatePost({
            body: {
                creator: req.body.manager,
                title: 'Project removed',
                content: `You have recently deleted project ${req.body.title}`,
                project: deletedProject._id,
                image: req.body.image,
                task: req.body.task,
                friend: req.body.friend,
                manager: req.body.manager,
                member: req.body.member,
                type: 'deleted project'
            }
        }, res, false);

        if (!updatedPost) {
            return res.status(400).json({ message: 'Post not updated' });
        }

        return res.status(200).json({
            message: 'Project deleted',
            deletedProject
        });
    } catch (error) {
        throw new Error(error);
    }
}

const getProjectById = async (req, res) => {
    try {
        const project = await project.findById(req.body._id);
        if (!project) {
            return res.status(400).json({ message: 'Project not found' });
        }
        return res.status(200).json({
            message: 'Project found',
            project
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addProject,
    getAllProjects,
    updateProject,
    deleteProject,
    getProjectById,
    getProjectByManager,
    getProjectByMember,
    getAllMembersByIdProject
};