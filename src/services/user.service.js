const user = require('../models/users.models')
const mongoose = require('mongoose')

const signUp = async (req, res) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.username }
            ]
        })
        if (holderUser) {
            return res.status(409).json({ message: 'Username or email already exists' });
        }
        const newUser = await user.create(req.body)
        return res.status(201).json({ message: 'User created', newUser });
    } catch (error) {
        throw new Error(error)
    }
}

const signIn = async (req, res) => {
    try {
        const holderUser = await user.findOne({
            $or: [
                { email: req.body.username_email },
                { username: req.body.username_email }
            ]
        })
        if (!holderUser || holderUser.password !== req.body.password) {
            return res.status(401).json({ message: 'Invalid username/email or password' });
        }
        return res.status(200).json({ message: 'Logged in', holderUser });
    } catch (error) {
        throw new Error(error)
    }
}

const logOut = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserByID = async (req, res) => {
    try {
        const holderUser = await use.findOne({ _id: req.body._id })
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
        const searchString = req.body.name
        const users = await user.find({
            $or: [
                { name: { $regex: searchString, $options: 'i' } },
                { username: { $regex: searchString, $options: 'i' } }
            ]
        });
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found'
            })
        }
        return res.status(200).json({
            message: 'Users found',
            users
        })
    } catch (error) {
        throw new Error(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await user.find()
        if (users.length === 0) {
            return res.status(404).json({
                message: 'No users found'
            })
        }
        return res.status(200).json({
            message: 'All users',
            users
        })
    } catch (error) {
        throw new Error(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const holderUser = await user.findByIdAndDelete(_id);
        if (!holderUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const holderUser = await user.findByIdAndUpdate(_id);
        if (!holderUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated' });
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    signUp,
    signIn,
    logOut,
    getUserByID,
    getUserByName,
    getAllUsers,
    deleteUserById,
    updateUserById
}