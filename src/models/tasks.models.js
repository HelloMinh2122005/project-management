'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    deadline: {
        type: Date
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