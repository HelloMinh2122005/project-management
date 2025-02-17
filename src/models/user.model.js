'use strict'

import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    avatar: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    description: {
        type: String
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TASK'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }],
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'USERS'
});

export default mongoose.model('USER', userSchema);