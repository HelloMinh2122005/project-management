import express from 'express';
const router = express.Router();

import ForgotPasswordService from '../../services/other/forgotPassword.service.js';
import ForgotPasswordController from '../../controllers/other/forgotPassword.controller.js';

const forgotPasswordService = new ForgotPasswordService();
const forgotPasswordController = new ForgotPasswordController(forgotPasswordService);

router.post('/', forgotPasswordController.sendEmail.bind(forgotPasswordController)); // checking
router.post('/verify', forgotPasswordController.verifyCode.bind(forgotPasswordController)); // checking

export default router;