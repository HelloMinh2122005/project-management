'use strict';

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ['InProcess', 'Done'],
        default: 'InProcess'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    quality: {
        type: String
    }
}, {
    collection: 'PROJECTS',
    timestamps: true
});

module.exports = mongoose.model('PROJECT', projectSchema);