'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'USERS',
    timestamps: true
});

module.exports = mongoose.model('USER', userSchema);