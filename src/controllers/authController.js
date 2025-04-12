import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import User from "../models/userModel.js";

// @desc Register new user
// @route POST /api/users/register
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
});

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // set refresh token to cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.MODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success: true,
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } else {
        throw new ApiError(401, 'Invalid email or password');
    }
});

// @desc Get user profile
// @route Get /api/users/profile
// @access Private (need token)
export const getUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    }

    throw new ApiError(404, 'User not found');
});

// @desc Refresh token
// @route Get /api/users/refresh-token
// @access Public
export const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        throw new ApiError(401, 'No refresh token');
    }
  
    const refreshToken = cookies.refreshToken;
  
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            throw new ApiError(403, 'Invalid refresh token');
        }
  
        const user = await User.findById(decoded.id);  
        if (!user) {
            throw new ApiError(401, 'User not found');
        }
  
        const accessToken = generateAccessToken(user._id);  
        res.status(200).json({ 
            success: true, 
            accessToken 
        });
    });
  });
  