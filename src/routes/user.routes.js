import express from 'express';
const router = express.Router();

import UserService from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';

const userService = new UserService();
const userController = new UserController(userService);

router.post('/createUser', userController.createUser.bind(userController));
router.get('/getAllUsers', userController.getAllUsers.bind(userController));
router.get('/getUserById', userController.getUserById.bind(userController));
router.patch('/updateUser', userController.updateUser.bind(userController));
router.delete('/deleteUser', userController.deleteUser.bind(userController));

export default router;