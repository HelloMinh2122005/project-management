'use strict'

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    type: { type: String, enum: ['like', 'comment', 'follow', 'mention', 'system'], required: true },
    content: { type: String, required: true },
    link: { type: String, required: false },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, {
    collection: 'NOTIFICATIONS',
    timestamps: true
});

module.exports = mongoose.model('NOTIFICATION', notificationSchema);