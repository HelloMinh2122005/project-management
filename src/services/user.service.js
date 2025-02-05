const user = require('../models/users.models')

const signUp = async (req) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })
        if (holderUser) {
            return { status: 400, message: 'User name or Email already exists' };
        }
        const newUser = await user.create(req.body)
        return { status: 201, message: 'New user created', newUser };
    } catch (error) {
        throw new Error(error)
    }
}

const signIn = async (req) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { email: req.body.username_email },
                { username: req.body.username_email }
            ]
        })
        if (!holderUser || holderUser.password !== req.body.password) {
            return { status: 401, message: 'Invalid username or password' };
        }
        return {
            status: 200, message: {
                id: holderUser.id
            }
        };
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    signUp,
    signIn
}