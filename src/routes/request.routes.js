import express from 'express';
const router = express.Router();

import RequestService from '../services/request.service.js';
import RequestController from '../controllers/request.controller.js';

const requestService = new RequestService();
const requestController = new RequestController(requestService);

router.post('/', requestController.createRequest.bind(requestController));
router.get('/', requestController.getAllRequests.bind(requestController));
router.get('/:id', requestController.getRequestById.bind(requestController));
router.get('/:type/:id', requestController.getRequestAndPopulate.bind(requestController));
router.delete('/:id', requestController.deleteRequest.bind(requestController));

// Nếu cần endpoint cho request theo người dùng, cân nhắc:
router.get('/user/:userId', requestController.getRequestForUser.bind(requestController));

export default router;