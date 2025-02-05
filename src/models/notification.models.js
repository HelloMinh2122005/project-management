'use strict'

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    type: {
        type: String,
        enum: ['task', 'project', 'join request', 'friend'],
        required: true
    },
    content: { type: String, required: true },
    link: { type: String, required: false },
    isread: { type: Boolean, default: false },
}, {
    collection: 'NOTIFICATIONS',
    timestamps: true
});

module.exports = mongoose.model('NOTIFICATION', notificationSchema);