import { Router } from 'express';
import {
  registerUser,
  loginUser,
  googleAuth,
} from '../controllers/authController.js';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user with name, email, and password
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Login user with email and password
router.post('/login', loginUser);

// @route   POST /api/auth/google
// @desc    Authenticate/Register user using Google OAuth credential token
router.post('/google', googleAuth);

export default router;