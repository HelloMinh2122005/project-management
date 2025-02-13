const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');

const userService = new UserService();
const userController = new UserController(userService);

router.post('/createUser', userController.createUser.bind(userController));
router.get('/getAllUsers', userController.getAllUsers.bind(userController));
router.get('/getUserById', userController.getUserById.bind(userController));
router.patch('/updateUser', userController.updateUser.bind(userController));
router.delete('/deleteUser', userController.deleteUser.bind(userController));

module.exports = router;