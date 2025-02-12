'use strict'

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
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
    project: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PROJECT'
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        num_participants: {
            type: Number,
            default: 1
        },
        daydone: {
            type: Date,
            default: Date.now
        }
    }],
    task: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TASK'
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        },
        num_participants: {
            type: Number,
            default: 0
        },
        daydone: {
            type: Date,
            default: Date.now
        }
    }],
    friends: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        },
        avatar: {
            type: String
        },
        name: {
            type: String,
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        description: {
            type: String
        }
    }],
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'USERS'
});

module.exports = mongoose.model('USER', userSchema);