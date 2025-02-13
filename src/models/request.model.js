'use strict'

import mongoose from 'mongoose';

var requestSchema = new mongoose.Schema({
    recipients: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER',
            required: true,
            index: true,
        }
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER',
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['friend', 'project_join', 'task_join'],
        required: true,
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
    }
}, {
    timestamps: true,
    collection: 'REQUESTS'
});

var friend_requestSchema = new mongoose.Schema({
    request: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'REQUEST',
            required: true,
            index: true,
        }
    }
}, {
    timestamps: true,
    collection: 'FRIEND_REQUESTS'
});

var project_join_requestSchema = new mongoose.Schema({
    request: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'REQUEST',
            required: true,
            index: true,
        }
    },
    project: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PROJECT',
            required: true,
            index: true,
        }
    }
}, {
    timestamps: true,
    collection: 'PROJECT_JOIN_REQUESTS'
});

var task_join_requestSchema = new mongoose.Schema({
    task: {
        request: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'REQUEST',
                required: true,
                index: true,
            }
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TASK',
            required: true,
            index: true,
        }
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