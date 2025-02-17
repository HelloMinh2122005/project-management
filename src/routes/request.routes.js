import express from 'express';
const router = express.Router();

import RequestService from '../services/request.service.js';
import RequestController from '../controllers/request.controller.js';

const requestService = new RequestService();
const requestController = new RequestController(requestService);

router.post('/', requestController.createRequest.bind(requestController)); // checking
router.get('/', requestController.getAllRequests.bind(requestController)); // checking
router.get('/:id', requestController.getRequestById.bind(requestController)); // checking
router.get('/:type/:id', requestController.getRequestAndPopulate.bind(requestController)); // checking
router.delete('/:id', requestController.deleteRequest.bind(requestController)); // checking

// Nếu cần endpoint cho request theo người dùng, cân nhắc:
router.get('/user/:userId', requestController.getRequestForUser.bind(requestController));  // checking

export default router;