require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const session = require('express-session');
const router = require('./routes/index.routes')
const morgan = require('morgan')

// Middleware
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: Number(process.env.SESSION_LIFETIME)
    }
}));
app.use(cors());


// Database
require('./configs/database')

// Routes
app.use('/', router)

// Error handlers


module.exports = app  