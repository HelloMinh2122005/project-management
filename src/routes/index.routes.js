const express = require('express');
const router = express.Router();

const notificationRouter = require('./notification.routes');
const requestRouter = require('./request.routes');
const taskRouter = require('./task.routes');
const projectRouter = require('./project.routes');
const userRouter = require('./user.routes');
const accessRouter = require('./other/access.routes');

router.use('/auth', accessRouter);
router.use('/notification', notificationRouter);
router.use('/request', requestRouter);
router.use('/task', taskRouter);
router.use('/project', projectRouter);
router.use('/user', userRouter);

module.exports = router;
