import express from 'express';
const router = express.Router();

import RequestService from '../services/request.service.js';
import RequestController from '../controllers/request.controller.js';

const requestService = new RequestService();
const requestController = new RequestController(requestService);

router.post('/create', requestController.createRequest.bind(requestController));
router.get('/all', requestController.getAllRequests.bind(requestController));
router.get('/:type/:id', requestController.getRequestAndPopulate.bind(requestController));
router.get('/:id', requestController.getRequestById.bind(requestController));
router.delete('/:id', requestController.deleteRequest.bind(requestController));
router.get('/user/:type/:userID', requestController.getRequestForUser.bind(requestController));

export default router;