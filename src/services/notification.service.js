import notification from '../models/notification.model.js';
import NotificationFactory from './utils/notificationFactory.js';

class NotificationService {
    async createNotification(type, type_model, payload) {
        return await NotificationFactory.createNotification(type, type_model, payload);
    }

    async getNotificationAndPopulate(type_model, notificationId) {
        return await NotificationFactory.getNotificationAndPopulate(type_model, notificationId);
    }

    async getAllNotifications() {
        return await notification.find();
    }

    async getNotificationById(notificationId) {
        return await notification.findById(notificationId);
    }

    async deleteNotification(notificationId) {
        return await notification.findByIdAndDelete(notificationId);
    }
}

export default NotificationService;