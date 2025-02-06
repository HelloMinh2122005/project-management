const post = require('../models/post.models');
const user_project = require('../models/users-projects');
const user_task = require('../models/users-tasks');

const addPost = async (req, res) => {
    try {
        const newPost = await post.create(req.body)
        createNotificationPost(newPost, res)
        return res.status(201).json({
            message: 'new post created',
            newPost
        })
    } catch (error) {
        throw new Error(error)
    }
}

const createNotificationPost = async (newPost, res) => {
    try {

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    addPost
}