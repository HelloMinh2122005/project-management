'use strict'

import mongoose from 'mongoose';

var requestSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        index: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        index: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    message: {
        type: String,
    },
    type: {
        type: String,
        enum: ['friend', 'project', 'task'],
        required: true,
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true,
    collection: 'REQUESTS'
});

var friend_requestSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQUEST',
        index: true
    }
}, {
    timestamps: true,
    collection: 'FRIEND_REQUESTS'
});

var project_join_requestSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQUEST',
        index: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        index: true
    }
}, {
    timestamps: true,
    collection: 'PROJECT_JOIN_REQUESTS'
});

var task_join_requestSchema = new mongoose.Schema({
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQUEST',
        index: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TASK',
        index: true
    }
}, {
    timestamps: true,
    collection: 'TASK_JOIN_REQUESTS'
});

export default {
    REQUEST: mongoose.model('REQUEST', requestSchema),
    FRIEND_REQUEST: mongoose.model('FRIEND_REQUEST', friend_requestSchema),
    PROJECT_JOIN_REQUEST: mongoose.model('PROJECT_JOIN_REQUEST', project_join_requestSchema),
    TASK_JOIN_REQUEST: mongoose.model('TASK_JOIN_REQUEST', task_join_requestSchema),
}