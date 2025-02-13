'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }

    connect = async () => {
        try {
            await mongoose.connect(process.env.URL_DB);
            console.log('MongoDB Connected Successfully');
        } catch (error) {
            console.error('PLEASE LORD DONT DO THIS TO ME:', error);
            process.exit(1);
        }
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}

module.exports = Database.getInstance();
