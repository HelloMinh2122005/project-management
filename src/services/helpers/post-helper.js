const { getAllMembersByIdProject } = require('./project-helper');
const { getProjectIdByTaskId } = require('../helpers/task-helper');
const post = require('../../models/post.models');

const getRecipients = async (body, res, sendResponse = true) => {
    try {
        let recipients;
        if (body.project) {
            const members = await getAllMembersByIdProject(body.project, res, false);
            recipients = members.map(member => member._id);
        } else if (body.task) {
            const project = await getProjectIdByTaskId(body.task, res, false);
            const members = await getAllMembersByIdProject(project, res, false);
            recipients = members.map(member => member._id);
        } else if (body.friend) {
            recipients = body.friend;
        } else if (body.manager) {
            recipients = body.manager;
        } else if (body.member) {
            recipients = body.member;
        }
        if (!recipients) {
            throw new Error('Recipients not found');
        }
        return recipients;
    } catch (error) {
        throw new Error(error);
    }
}

const getPostIDByRefID = async (req, res, sendResponse = true) => {
    try {
        var postHolder;
        if (req.body.project) {
            postHolder = await post.findOne({ project: req.project });
        } else if (req.body.task) {
            postHolder = await post.findOne({ task: req.task });
        } else if (req.body.friend) {
            postHolder = await post.findOne({ friend: req.friend });
        } else if (req.body.manager) {
            postHolder = await post.findOne({ manager: req.manager });
        } else if (req.body.member) {
            postHolder = await post.findOne({ member: req.member });
        }
        if (!postHolder) {
            if (sendResponse) {
                return res.status(404).json({ message: 'Post not found' });
            }
            else
                throw new Error('Post not found');
        }
        if (sendResponse) {
            return res.status(200).json({
                message: 'Post found',
                postId: postHolder._id
            });
        }
        return postHolder._id;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getRecipients,
    getPostIDByRefID
}