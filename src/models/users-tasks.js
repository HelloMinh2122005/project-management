'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const userTasksSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    status: {
        type: String,
        enum: ['InProcess', 'Done'],
        default: 'InProcess'
    },
    feedback: {
        type: String
    }
}, {
    collection: 'USERS_TASKS',
    timestamps: true
});

module.exports = mongoose.model('USER_TASK', userTasksSchema);