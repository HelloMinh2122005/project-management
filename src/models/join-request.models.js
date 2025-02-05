'use strict';

const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
}, {
    collection: 'JOIN_REQUESTS',
    timestamps: true
});

module.exports = mongoose.model('JOIN_REQUEST', joinRequestSchema);