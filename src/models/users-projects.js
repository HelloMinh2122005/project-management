'use strict';

const mongoose = require('mongoose');

const users_projects = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true
    },
    feedback: {
        type: String
    }
}, {
    collection: 'USERS_PROJECTS',
    timestamps: true
});

module.exports = mongoose.model('USER_PROJECT', users_projects);