const user = require('../models/users.models')

const signUp = async (req, res) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })
        if (holderUser) {
            return res.status(400).json({ message: 'User name or Email already exists' })
        }
        const newUser = await user.create(req.body)
        return res.status(201).json({
            message: 'new user created',
            newUser
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    signUp
}