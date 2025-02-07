const post = require('../models/post.models');
const { createNotificationPost } = require('./helpers/notification-helper');
const { getRecipients } = require('./helpers/post-helper');


const addPost = async (req, res, sendResponse = true) => {
    try {
        const newPost = await post.create({
            creator: req.body.creator,
            title: req.body.title,
            content: req.body.content,
        });
        if (!newPost) {
            if (sendResponse) {
                return res.status(400).json({ message: 'Post not created' });
            } else {
                throw new Error('Post not created');
            }
        }
        const type = req.body.type;
        const recipients = getRecipients(req.body);

        await createNotificationPost(newPost, recipients, type);

        if (sendResponse) {
            return res.status(201).json({
                message: 'new post created',
                newPost
            });
        } else {
            return newPost;
        }
    } catch (error) {
        throw new Error(error);
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await post.find();
        if (!posts) {
            return res.status(400).json({ message: 'Posts not found' });
        }
        return res.status(200).json({
            message: 'Posts found',
            posts
        });
    } catch (error) {
        throw new Error(error);
    };
};

const getPostById = async (req, res) => {
    try {
        const post = await post.findById(req.body._id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({
            message: 'Post found',
            post
        });
    } catch (error) {
        throw new Error(error);
    }
}

const updatePost = async (req, res, sendResponse = true) => {
    try {
        const { type, ...updateData } = req.body;

        const updatedPost = await post.findByIdAndUpdate(req.body._id, updateData, { new: true });
        if (!updatedPost) {
            if (sendResponse) {
                return res.status(400).json({ message: 'Post not found' });
            } else {
                throw new Error('Post not found');
            }
        }

        const recipients = getRecipients(req.body);
        await createNotificationPost(updatedPost, recipients, type);

        if (sendResponse) {
            return res.status(200).json({
                message: 'Post updated',
                updatedPost
            });
        } else {
            return updatedPost;
        }
    } catch (error) {
        throw new Error(error);
    }
}

// ADMIN ONLY 
const deletePost = async (req, res, sendResponse = true) => {
    try {
        const { type, ...deleteData } = req.body;

        const deletedPost = await post.findByIdAndDelete(deleteData._id);
        if (!deletedPost) {
            if (sendResponse) {
                return res.status(400).json({ message: 'Post not found' });
            } else {
                throw new Error('Post not found');
            }
        }

        const recipients = getRecipients(req.body);
        await createNotificationPost(deletedPost, recipients, type);

        if (sendResponse) {
            return res.status(200).json({
                message: 'Post deleted',
                deletedPost
            });
        } else {
            return deletedPost;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getPostByIdCreator = async (req, res) => {
    try {
        const posts = await post.find({ creator: req.body.creator });
        if (!posts) {
            return res.status(400).json({ message: 'Posts not found' });
        }
        return res.status(200).json({
            message: 'Posts found',
            posts
        });
    } catch (error) {
        throw new Error(error);
    }
}

const getPostByIdProject = async (req, res) => {
    try {
        const posts = await post.find({ project: req.body.project });
        if (!posts) {
            return res.status(400).json({ message: 'Posts not found' });
        }
        return res.status(200).json({
            message: 'Posts found',
            posts
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getPostByIdCreator,
    getPostByIdProject
};
