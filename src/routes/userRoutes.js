// src/routes/userRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Fix path
import { 
    registerUser, 
    authUser, 
    getUserProfile,
    refreshToken,
    updateUserProfile
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/refresh-token', refreshToken);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
