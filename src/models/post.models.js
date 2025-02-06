'use strict';

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

var postSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
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
});

module.exports = mongoose.model('POST', postSchema);