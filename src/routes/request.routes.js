const express = require('express');
const router = express.Router();

const RequestService = require('../services/request.service');
const RequestController = require('../controllers/request.controller');

const requestService = new RequestService();
const requestController = new RequestController(requestService);

module.exports = router;