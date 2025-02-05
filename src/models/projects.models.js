'use strict';

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    dayEnd: {
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
    feedback: {
        type: String
    }
}, {
    collection: 'PROJECTS',
    timestamps: true
});

module.exports = mongoose.model('PROJECT', projectSchema);