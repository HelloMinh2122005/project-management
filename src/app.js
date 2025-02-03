require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session');
const router = require('./routes/web')
const morgan = require('morgan')
const configViewEngine = require('./configs/view-engine')

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

// View engine setup
configViewEngine(app)

// Database
require('./configs/database')

// Routes
app.use('/', router)

// Error handlers


// test code

module.exports = app  