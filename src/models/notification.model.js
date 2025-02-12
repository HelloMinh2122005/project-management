'use strict'

const mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    attributes: {
        type: mongoose.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
    collection: 'NOTIFICATIONS'
});

var friend_notificationSchema = new mongoose.Schema({
    notification: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NOTIFICATION',
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
}, {
    timestamps: true,
    collection: 'FRIEND_NOTIFICATIONS'
});

var project_notificationSchema = new mongoose.Schema({
    notification: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NOTIFICATION',
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
    },
}, {
    timestamps: true,
    collection: 'PROJECT_NOTIFICATIONS'
});

var task_notificationSchema = new mongoose.Schema({
    notification: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NOTIFICATION',
            required: true,
            index: true,
        }
    },
    task: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TASK',
            required: true,
            index: true,
        }
    },
}, {
    timestamps: true,
    collection: 'TASK_NOTIFICATIONS'
});

//Export the model
module.exports = {
    Notification: mongoose.model('NOTIFICATION', notificationSchema),
    FriendNotification: mongoose.model('FRIEND_NOTIFICATION', friend_notificationSchema),
    ProjectNotification: mongoose.model('PROJECT_NOTIFICATION', project_notificationSchema),
    TaskNotification: mongoose.model('TASK_NOTIFICATION', task_notificationSchema),
}