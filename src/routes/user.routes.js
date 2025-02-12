const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');

const userService = new UserService();
const userController = new UserController(userService);

module.exports = router;