import express from 'express';
const router = express.Router();

import NotificationService from '../services/notification.service.js';
import NotificationController from '../controllers/notification.controller.js';

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

router.post('/', notificationController.createNotification.bind(notificationController));
router.get('/', notificationController.getAllNotifications.bind(notificationController));
router.get('/:id', notificationController.getNotificationById.bind(notificationController));
router.delete('/:id', notificationController.deleteNotification.bind(notificationController));

export default router;