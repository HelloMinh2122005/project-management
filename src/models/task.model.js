'use strict'

import mongoose from 'mongoose';

var taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT',
        required: true,
        index: true,
    },
    file: {
        type: String,
    },
    status: {
        type: String,
        enum: ["to do", "in progress", "done"],
        default: 'to do',
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }],
    member_comment: {
        type: String
    },
    manager_comment: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'TASKS'
});


export default mongoose.model('TASK', taskSchema);