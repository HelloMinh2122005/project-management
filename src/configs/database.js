'use strict';

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

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

export default Database;
