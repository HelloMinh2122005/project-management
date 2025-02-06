'use strict';

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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