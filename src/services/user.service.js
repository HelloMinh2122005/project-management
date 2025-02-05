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

const logOut = async (req, res) => {
    try {
        req.session.destroy();
        return { status: 200, message: 'Logged out' };
    } catch (error) {
        return { status: 500, message: 'Internal server error' };
    }
}

const getUserByID = async (req, res) => {
    try {
        const holderUser = await user.findOne({ id: req.body.id })
        if (!holderUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        return res.status(200).json({
            message: 'User found',
            holderUser
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getUserByName = async (req, res) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { name: req.body.name },
                { username: req.body.name }
            ]
        })
        if (!holderUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        return res.status(200).json({
            message: 'User found',
            holderUser
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    signUp,
    signIn,
    logOut,
    getUserByID,
    getUserByName
}