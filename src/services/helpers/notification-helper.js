const { createNotification } = require('../notification.service');

const createNotificationPost = async (newPost, recipients, type) => {
    try {
        if (Array.isArray(recipients)) {
            await Promise.all(recipients.map(async recipient => {
                await createNotification({
                    post: newPost._id,
                    recipient: recipient,
                    title: newPost.title,
                    content: newPost.content,
                    type: type
                });
            }));
        } else {
            await createNotification({
                post: newPost._id,
                recipient: recipients,
                title: newPost.title,
                content: newPost.content,
                type: type
            });
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createNotificationPost
}