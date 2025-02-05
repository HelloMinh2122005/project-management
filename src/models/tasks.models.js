'use strict';

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true
    },
    deadline: {
        type: Date
    },
    isTaken: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['InProcess', 'Done'],
        default: 'InProcess'
    }
}, {
    collection: 'TASKS',
    timestamps: true
});

module.exports = mongoose.model('TASK', taskSchema);