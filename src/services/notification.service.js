import notification from '../models/notification.model.js';

class NotificationService {
    async getAllNotifications() {
        return await notification.find();
    }

    async getNotificationById(notificationId) {
        return await notification.findById(notificationId);
    }

    async createNotification(notification) {
        return await notification.create(notification);
    }

    async deleteNotification(notificationId) {
        return await notification.findByIdAndDelete(notificationId);
    }
}

export default NotificationService;