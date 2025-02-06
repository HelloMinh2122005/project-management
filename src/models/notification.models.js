'use strict'

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'POST'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    isread: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['new task', 'taken task', 'completed task', 'deleted task', 'manager reply task', 'member reply task', 'updated task',
            'new project', 'completed project', 'deleted project', 'manager feedback project', 'updated project',
            'new join request', 'accepted join request', 'rejected join request', 'deleted join request',
            'new addfriend', 'accepted addfriend', 'rejected addfriend', 'deleted addfriend',
        ],
        required: true
    },
}, {
    collection: 'NOTIFICATIONS',
    timestamps: true
});

module.exports = mongoose.model('NOTIFICATION', notificationSchema);