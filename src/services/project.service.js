const project = require('../models/projects.models');
const user_project = require('../models/users-projects');
const user = require('../models/users.models');
const { addPost, updatePost } = require('./post.service');
const { getProjectByMember, getAllMembersByIdProject } = require('./helpers/project-helper');
const { getPostIDByRefID } = require('./helpers/post-helper');

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

        if (!req.body.manager) {
            return res.status(400).json({ message: 'SEND AGAIN THE FUCKING HTTP' });
        }
        const manager = await user.findById(req.body.manager);
        if (!manager) {
            return res.status(400).json({ message: 'Manager not found' });
        }

        const postID = await getPostIDByRefID({ body: { project: req.body._id } }, res, false);

        const updateData = {
            _id: postID,
            title: 'Project updated',
            content: `${manager.name} have recently updated project ${updatedProject.title}`,
            project: updatedProject._id,
            type: 'updated project'
        };

        if (req.body.image) updateData.image = req.body.image;
        if (req.body.task) updateData.task = req.body.task;
        if (req.body.friend) updateData.friend = req.body.friend;
        if (req.body.member) updateData.member = req.body.member;

        // Dynamically require updatePost to avoid circular dependency issues
        const { updatePost: updatePostFn } = require('./post.service');
        const updatedPost = await updatePostFn({ body: updateData }, res, false);

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
};

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await project.findById(req.body._id);
        if (!deletedProject) {
            return res.status(400).json({ message: 'Project not found' });
        }

        // delete all members
        const deletedMembers = await user_project.deleteMany({ project: req.body._id });
        if (!deletedMembers) {
            return res.status(400).json({ message: 'Members not deleted' });
        }

        // fetch manager information from the deleted project
        const manager = await user.findById(deletedProject.manager);
        if (!manager) {
            return res.status(400).json({ message: 'Manager not found' });
        }

        const postID = await getPostIDByRefID({ body: { project: req.body._id } }, res, false);

        const updateData = {
            _id: postID,
            title: 'Project updated',
            content: `${manager.name} has recently deleted project ${deletedProject.title}`,
            project: deletedProject._id,
            type: 'deleted project'
        };

        if (req.body.image) updateData.image = req.body.image;
        if (req.body.task) updateData.task = req.body.task;
        if (req.body.friend) updateData.friend = req.body.friend;
        if (req.body.member) updateData.member = req.body.member;

        // Dynamically require updatePost to avoid circular dependency issues
        const { updatePost: updatePostFn } = require('./post.service');
        const updatedPost = await updatePostFn({ body: updateData }, res, false);

        if (!updatedPost) {
            return res.status(400).json({ message: 'Post not updated' });
        }

        await project.findByIdAndDelete(deletedProject._id);

        return res.status(200).json({
            message: 'Project deleted',
            deletedProject
        });
    } catch (error) {
        throw new Error(error);
    }
};

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
    getProjectByMember,
    getAllMembersByIdProject
};