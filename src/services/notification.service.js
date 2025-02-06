const notification = require('../models/notification.models')

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

module.exports = {
    createNotification
}