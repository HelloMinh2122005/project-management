'use strict'

import mongoose from 'mongoose';

var notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        index: true,
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    type: {
        type: String,
        enum: ['request', 'modification'],
        default: 'request',
    },
    type_model: {
        type: String,
        enum: ['friend', 'project', 'task'],
        default: 'friend'
    },
    is_read: {
        type: Boolean,
        default: false
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
    collection: 'NOTIFICATIONS'
});

var RequestNotification = new mongoose.Schema({
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NOTIFICATION',
        required: true,
        index: true,
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'REQUEST',
        required: true,
        index: true,
    }
}, {
    timestamps: true,
    collection: 'REQUEST_NOTIFICATIONS'
});

var ProjectModificationNotification = new mongoose.Schema({
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NOTIFICATION',
        required: true,
        index: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true,
        index: true,
    }
}, {
    timestamps: true,
    collection: 'PROJECT_MODIFICATION_NOTIFICATIONS'
});

var TaskModificationNotification = new mongoose.Schema({
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NOTIFICATION',
        required: true,
        index: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TASK',
        required: true,
        index: true,
    }
}, {
    timestamps: true,
    collection: 'TASK_MODIFICATION_NOTIFICATIONS'
});

export default {
    Notification: mongoose.model('NOTIFICATION', notificationSchema),
    RequestNotification: mongoose.model('REQUEST_NOTIFICATION', RequestNotification),
    ProjectNotification: mongoose.model('PROJECT_MODIFICATION_NOTIFICATION', ProjectModificationNotification),
    TaskNotification: mongoose.model('TASK_MODIFICATION_NOTIFICATION', TaskModificationNotification),
};