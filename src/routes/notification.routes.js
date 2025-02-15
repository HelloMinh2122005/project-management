import express from 'express';
const router = express.Router();

import NotificationService from '../services/notification.service.js';
import NotificationController from '../controllers/notification.controller.js';

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

router.post('/create', notificationController.createNotification.bind(notificationController));
router.get('/all', notificationController.getAllNotifications.bind(notificationController));
router.get('/getbyid', notificationController.getNotificationById.bind(notificationController));
router.delete('/delete', notificationController.deleteNotification.bind(notificationController));

export default router;