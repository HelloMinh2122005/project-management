'use strict'

import mongoose from 'mongoose';

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

export default mongoose.model('VERIFICATION TOKEN', verificationTokenSchema);