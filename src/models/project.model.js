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
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'USER'
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
    participants: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'
        }
    }],
    notifications: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NOTIFICATION'
        }
    }]
}, {
    timestamps: true,
    collection: 'PROJECTS'
});

export default mongoose.model('PROJECT', projectSchema);