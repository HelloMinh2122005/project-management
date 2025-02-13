import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import router from './routes/index.routes.js';
import morgan from 'morgan';
import Database from './configs/database.js';

const app = express();

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

// Initialize Database
Database.getInstance();

// Routes
app.use('/', router)

// Error handlers

export default app;