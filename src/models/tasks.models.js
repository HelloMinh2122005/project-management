'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    dayStart: {
        type: Date,
        default: Date.now
    },
    dayEnd: {
        type: Date
    },
    isTaken: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['InProcess', 'Done'],
        default: 'InProcess'
    }
}, {
    collection: 'TASKS',
    timestamps: true
});

module.exports = mongoose.model('TASK', taskSchema);