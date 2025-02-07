const notification = require('../models/notification.models')

// 

const createNotification = async (data) => {
    try {
        const newNotification = await notification.create({
            post: data.post,
            recipient: data.recipient,
            title: data.title,
            content: data.content,
            type: data.type,
            // Optionally: link: data.link
        });
        if (!newNotification) {
            throw new Error('Notification not created');
        }
        return newNotification;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteNotification = async (req, res) => {
    try {
        const deletedNoti = await notification.findByIdAndDelete(req.body._id);
        if (!deletedNoti) {
            return res.status(400).json({ message: 'Notification not found' });
        }
        return res.status(200).json({
            message: 'Notification deleted',
            deletedNoti
        });
    } catch (error) {
        throw new Error(error);
    }
}

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notification.find({
            recipient: req.body.recipient
        }).sort({ createdAt: -1 });
        if (!notifications) {
            return res.status(400).json({ message: 'Notifications not found' });
        }
        return res.status(200).json({
            message: 'Notifications found',
            notifications
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createNotification,
    deleteNotification,
    getAllNotifications
}