const express = require('express');
const router = express.Router();

const NotificationService = require('../services/notification.service');
const NotificationController = require('../controllers/notification.controller');

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

module.exports = router;