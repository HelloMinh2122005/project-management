const user = require('../models/users.models')

const signUp = async (req, res) => {
    try {
        const holderUser = await user.findOne({ email: req.body.email })
        if (holderUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const newUser = await user.create(req.body)
        return res.status(201).json('new user created', newUser)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    signUp
}