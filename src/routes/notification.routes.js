import express from 'express';
const router = express.Router();

import NotificationService from '../services/notification.service.js';
import NotificationController from '../controllers/notification.controller.js';

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

export default router;