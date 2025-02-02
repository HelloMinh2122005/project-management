'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const users_projects = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    feedback: {
        type: String
    },
    role: {
        type: String,
        enum: ['Manager', 'Member'],
        default: 'Member'
    }
}, {
    collection: 'USERS_PROJECTS',
    timestamps: true
});

module.exports = mongoose.model('USER_PROJECT', users_projects);