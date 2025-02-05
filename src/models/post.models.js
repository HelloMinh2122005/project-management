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
    }
});

module.exports = mongoose.model('POST', postSchema);