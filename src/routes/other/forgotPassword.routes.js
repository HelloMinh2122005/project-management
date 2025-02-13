const express = require('express');
const router = express.Router();

const ForgotPasswordService = require('../../services/other/forgotPassword.service');
const ForgotPasswordController = require('../../controllers/other/forgotPassword.controller');

const forgotPasswordService = new ForgotPasswordService();
const forgotPasswordController = new ForgotPasswordController(forgotPasswordService);

router.post('/send-verification-code', forgotPasswordController.sendEmail.bind(forgotPasswordController));
router.post('/verify-code', forgotPasswordController.verifyCode.bind(forgotPasswordController));

module.exports = router;