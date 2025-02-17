import express from 'express';
const router = express.Router();

import UserService from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.createUser.bind(userController)); // checking
router.get('/', userController.getAllUsers.bind(userController)); // checking
router.get('/:id', userController.getUserById.bind(userController)); // checking
router.patch('/:id', userController.updateUser.bind(userController)); // checking
router.delete('/:id', userController.deleteUser.bind(userController)); // checking

export default router;