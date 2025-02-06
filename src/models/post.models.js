'use strict';

const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },
    image: {
        type: String,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PROJECT'
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TASK'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    },
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }
}, {
    collection: 'POSTS',
    timestamps: true
});

module.exports = mongoose.model('POST', postSchema);