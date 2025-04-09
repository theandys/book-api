// ES Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import bookRoutes from './routes/bookRoutes.js';
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

// API Routes
app.use('/api/books', bookRoutes);  

// 404 middleware
app.use(notFound);

// error handler middleware
app.use(errorHandler);

export default app;