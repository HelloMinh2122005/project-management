const token = require('../models/token-key.models')
const user = require('../models/users.models')
const nodemailer = require('nodemailer');

require('dotenv').config()


const sendEmail = async (req, res) => {
    try {
        const { email } = req.body
        const userholder = await user.findOne({ email })
        if (!userholder) {
            return res.status(404).json({ message: 'User not found' })
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await token.create({ email, code })

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

    } catch (error) {
        console.error('Error in /send-verification-code:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const verifyCode = async (req, res) => {
    try {
        const tokenEntry = await token.findOne({ email: req.body.email, code: req.body.code })
        if (!tokenEntry) {
            return res.status(404).json({ message: 'Invalid code' })
        }
        req.session.user = { email: req.body.email };
        return res.status(200).json({ message: 'Code verified' })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    sendEmail,
    verifyCode
}