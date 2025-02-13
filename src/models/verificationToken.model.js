'use strict'

const mongoose = require('mongoose');

var verificationTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: "VERIFICATION TOKENS"
});

module.exports = mongoose.model('VERIFICATION TOKEN', verificationTokenSchema);