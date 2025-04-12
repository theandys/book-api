import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ApiError from '../utils/ApiError.js';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token , exclude password
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }
        catch (error) {
            throw new ApiError(401, 'Not authorized, token failed');
        }
    }

    if (!token) {
        throw new ApiError(401, 'Not authorized, no token');
    }
});