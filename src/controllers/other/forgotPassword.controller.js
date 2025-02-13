'use strict'

class ForgotPasswordController {
    constructor(verificationTokenService) {
        this.VerificationTokenService = verificationTokenService;
    }

    async sendEmail(req, res) {
        try {
            await this.VerificationTokenService.sendEmail(req.body.email);
            res.status(200).json({ message: 'Verification code sent to your email' });
        } catch (error) {
            console.error('Error in /send-verification-code:', error);
            res.status(500).json({ message: 'Error sending email' });
        }
    }

    async verifyCode(req, res) {
        try {
            const verified = await this.VerificationTokenService.verifyCode(req.body.email, req.body.code);
            if (!verified) {
                return res.status(404).json({ message: 'Invalid code' });
            }
            res.status(200).json({ message: 'Code verified' });
        } catch (error) {
            console.error('Error in /verify-code:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

export default ForgotPasswordController;