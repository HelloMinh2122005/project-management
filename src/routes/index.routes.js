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
router.use('/forgot-password', forgotPasswordRouter); // checking

// Authentication
router.use('/auth', accessRouter); // checking

// Authenticated routes
router.use('/user', userRouter); // checking
router.use('/project', projectRouter); // checking
router.use('/task', taskRouter); // checking
router.use('/request', requestRouter); // checking
router.use('/notification', notificationRouter); // checking

export default router;