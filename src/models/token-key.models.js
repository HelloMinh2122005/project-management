'use strict'

const mongoose = require('mongoose');

const TokenKeySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 }
    }
}, {
    collection: 'TOKEN-KEYS',
    timestamps: true
});

module.exports = mongoose.model('TOKEN-KEY', TokenKeySchema);