import nodemailer from 'nodemailer';
import User from '../../models/user.model.js';
import VerificationToken from '../../models/verificationToken.model.js';
import dotenv from 'dotenv';
dotenv.config();

class ForgotPasswordService {
    async sendEmail(email) {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User not found');
        }
        var code;
        const checkifTokenExists = await VerificationToken.findOne({ email });
        if (checkifTokenExists) {
            code = checkifTokenExists.code;
        } else {
            code = Math.floor(100000 + Math.random() * 900000).toString();
            await VerificationToken.create({ email, code });
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MINH_EMAIL,
                pass: process.env.MINH_EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.MINH_EMAIL,
            to: email,
            subject: 'Your Password Reset Verification Code',
            text: `Your verification code is: ${code}. It will expire in 10 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.json({ message: 'Verification code sent to your email' });
        });
    }

    async verifyCode(email, code) {
        const tokenEntry = await VerificationToken.findOne({ email, code });
        if (!tokenEntry) {
            return false;
        }
        await VerificationToken.deleteOne(tokenEntry);
        return true;
    }
}

export default ForgotPasswordService;