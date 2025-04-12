// src/routes/userRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Fix path
import { 
  registerUser, 
  authUser, 
  getUserProfile,
  refreshToken
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.get('/refresh-token', refreshToken);

export default router;
