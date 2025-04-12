import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import gravatar from 'gravatar';
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
        token: generateToken(user._id),
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
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
            token: accessToken,
            data: {
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
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
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
            token: accessToken 
        });
    });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (need token)
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);  
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
  
    // Update name dan email
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
     // Generate avatar URL
     user.avatar = gravatar.url(user.email, { s: '200', r: 'pg', d: 'mm' });
  
    // if password change
    if (req.body.password) {
        user.password = req.body.password;
    }
  
    const updatedUser = await user.save();
    const accessToken = generateAccessToken(updatedUser._id);
  
    res.status(200).json({
        success: true,
        token: accessToken, // new token
        data: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
        }
    });
});
  