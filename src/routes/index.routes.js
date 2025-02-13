import express from 'express';
const router = express.Router();

import notificationRouter from './notification.routes.js';
import requestRouter from './request.routes.js';
import taskRouter from './task.routes.js';
import projectRouter from './project.routes.js';
import userRouter from './user.routes.js';
import accessRouter from './other/access.routes.js';
import forgotPasswordRouter from './other/forgotPassword.routes.js';

// Non authenticated routes
router.use('/forgot-password', forgotPasswordRouter);

// Authentication
router.use('/auth', accessRouter);

// Authenticated routes
router.use('/notification', notificationRouter);
router.use('/request', requestRouter);
router.use('/task', taskRouter);
router.use('/project', projectRouter);
router.use('/user', userRouter);

export default router;