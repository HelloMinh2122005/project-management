'use strict'

const notification = require('../models/notification.model');

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

module.exports = NotificationService;   