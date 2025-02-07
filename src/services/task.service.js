const task = require('../models/tasks.models')
const { addPost } = require('./post.service')
const { getMemberByTaskID, getProjectIdByTaskId } = require('./helpers/task-helper')

// add, edit, delete, get all tasks, get by id, get by project, get by member  

const getAllTasks = async (req, res) => {
    try {
        const tasks = await task.find()
        if (!tasks) {
            return res.status(400).json({ message: 'Tasks not found' })
        }
        return res.status(200).json({
            message: 'Tasks found',
            tasks
        })
    } catch (error) {
        throw new Error(error)
    }
}

const addTask = async (req, res) => {
    try {
        const newTask = await task.create({
            project: req.body.project,
            user: req.body.user,
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline
        })
        if (!newTask) {
            return res.status(400).json({ message: 'Task not created' })
        }

        const newPost = await addPost({
            body: {
                creator: req.body.user,
                title: 'New task',
                content: `You have recently created task ${req.body.title}`,
                task: newTask._id,
                type: 'new task'
            }
        })

        if (!newPost) {
            return res.status(400).json({ message: 'Post not created' })
        }

        return res.status(201).json({
            message: 'Task created',
            newTask
        })
    } catch (error) {
        throw new Error(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const updatedTask = await task.findByIdAndUpdate(req.body._id, req.body, { new: true })
        if (!updatedTask) {
            return res.status(400).json({ message: 'Task not updated' })
        }

        const updatedPost = await updatedPost({
            body: {
                creator: req.body.manager,
                title: 'Task updated',
                content: `You have recently updated task ${req.body.title}`,
                project: deletedProject._id,
                image: req.body.image,
                task: req.body.task,
                friend: req.body.friend,
                manager: req.body.manager,
                member: req.body.member,
                type: 'updated task'
            }
        }, res, false);

        if (!updatedPost) {
            return res.status(400).json({ message: 'Post not updated' });
        }

        return res.status(200).json({
            message: 'Task updated',
            updatedTask
        })
    } catch (error) {
        throw new Error(error)
    }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await task.findByIdAndDelete(req.body._id)
        if (!deletedTask) {
            return res.status(400).json({ message: 'Task not found' })
        }

        const updatedPost = await updatedPost({
            body: {
                creator: req.body.manager,
                title: 'Task removed',
                content: `You have recently deleted task ${req.body.title}`,
                project: deletedProject._id,
                image: req.body.image,
                task: req.body.task,
                friend: req.body.friend,
                manager: req.body.manager,
                member: req.body.member,
                type: 'deleted task'
            }
        }, res, false);

        if (!updatedPost) {
            return res.status(400).json({ message: 'Post not updated' });
        }

        return res.status(200).json({
            message: 'Task deleted',
            deletedTask
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await task.findById(req.body._id)
        if (!task) {
            return res.status(400).json({ message: 'Task not found' })
        }
        return res.status(200).json({
            message: 'Task found',
            task
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getMemberByTaskID,
    getProjectIdByTaskId
}