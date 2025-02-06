const post = require('../models/post.models');
const user_project = require('../models/users-projects');
const user_task = require('../models/users-tasks');

const addPost = async (req, res) => {
    try {
        const newPost = await post.create(req.body)
        createNotificationPost(newPost)
        return res.status(201).json({
            message: 'new post created',
            newPost
        })
    } catch (error) {
        throw new Error(error)
    }
}

const createNotificationPost = async (newPost) => {
    try {
        if (newPost.id_project) {
            const users = await user_project.find({ project: newPost.id_project })
            users.forEach(async (user) => {
                await notification.create({
                    id_post: newPost._id,
                    recipient: user.user,
                    content: newPost.title
                })
            })
            return { status: 201, message: 'Notification created' }
        }
        if (newPost.id_task) {
            const users = await user_task.find({ task: newPost.id_task })
            users.forEach(async (user) => {
                await notification.create({
                    id_post: newPost._id,
                    recipient: user.user,
                    content: newPost.title
                })
            })
            return { status: 201, message: 'Notification created' }
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addPost
}