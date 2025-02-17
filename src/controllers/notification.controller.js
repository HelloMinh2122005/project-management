'use strict'

class NotificationController {
    constructor(notificationService) {
        this.NotificationService = notificationService;
    }

    async createNotification(req, res) {
        try {
            const { type, type_model, payload } = req.body;
            const notification = await this.NotificationService.createNotification(type, type_model, payload);
            res.status(201).send(notification);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getAllNotifications(req, res) {
        try {
            const notifications = await this.NotificationService.getAllNotifications();
            res.status(200).send(notifications);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async getNotificationById(req, res) {
        try {
            const notification = await this.NotificationService.getNotificationById(req.params.id);
            if (!notification) {
                return res.status(404).send('Notification not found');
            }
            res.status(200).send(notification);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    async deleteNotification(req, res) {
        try {
            const notification = await this.NotificationService.deleteNotification(req.params.id);
            if (!notification) {
                return res.status(404).send('Notification not found');
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}

export default NotificationController;