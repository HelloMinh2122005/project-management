const post = require('../models/post.models');
const { createNotificationPost } = require('./helpers/notification-helper');
const { getAllMembersByIdProject } = require('./helpers/project-helper');
const { getMemberByTaskID } = require('./task.service');

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
        let recipients;

        if (req.body.project) {
            const members = await getAllMembersByIdProject(req.body.project);
            recipients = members.map(member => member._id);
        } else if (req.body.task) {
            const result = await getMemberByTaskID({ body: { task: req.body.task } }, res);
            recipients = result.members.map(member => member._id);
        } else if (req.body.friend) {
            recipients = req.body.friend;
        } else if (req.body.manager) {
            recipients = req.body.manager;
        } else if (req.body.member) {
            recipients = req.body.member;
        }

        if (!recipients) {
            if (sendResponse) {
                return res.status(400).json({ message: 'Recipients not found' });
            } else {
                throw new Error('Recipients not found');
            }
        }

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
    }
}

module.exports = {
    addPost,
    getAllPosts
};
