'use strict'

import mongoose from 'mongoose';

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        index: true,
    },
    picture: {
        type: String
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'USER'
        },
        name: {
            type: String
        },
    },
    status: {
        type: String,
        enum: ['in progress', 'done'],
        default: 'active',
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    daydone: {
        type: Date
    },
    num_participants: {
        type: Number,
        default: 0
    },
    tasks: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TASK'
        }
    }],
    num_notifications: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    collection: 'PROJECTS'
});

export default mongoose.model('PROJECT', projectSchema);