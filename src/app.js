// ES Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import cookieParser from 'cookie-parser';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// CommonJS
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/books', bookRoutes);  
app.use('/api/users', userRoutes);

// 404 middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

export default app;