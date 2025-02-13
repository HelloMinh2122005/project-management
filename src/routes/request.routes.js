import express from 'express';
const router = express.Router();

import RequestService from '../services/request.service.js';
import RequestController from '../controllers/request.controller.js';

const requestService = new RequestService();
const requestController = new RequestController(requestService);

export default router;