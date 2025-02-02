'use strict'

require('dotenv').config()

const mysql2 = require('mysql2/promise')


class Database {
    constructor() {
        this.connect()
    }

    connect = () => mysql2.createPool({
        host: process.env.HOST_NAME,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    })

    static getInstance() {
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance
    }
}

module.exports = Database.getInstance()