import express from 'express';
const router = express.Router();

import NotificationService from '../services/notification.service.js';
import NotificationController from '../controllers/notification.controller.js';

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

router.post('/', notificationController.createNotification.bind(notificationController)); // checking
router.get('/', notificationController.getAllNotifications.bind(notificationController)); // checking
router.get('/:id', notificationController.getNotificationById.bind(notificationController)); // checking
router.delete('/:id', notificationController.deleteNotification.bind(notificationController)); // checking

export default router;