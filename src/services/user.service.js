'use strict'

import User from '../models/user.model.js';

class UserServices {
    async getAllUsers() {
        return await User.find();
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async createUser(user) {
        return await User.create(user);
    }

    async updateUser(userId, user) {
        return await User.findByIdAndUpdate(userId, user, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

export default UserServices;