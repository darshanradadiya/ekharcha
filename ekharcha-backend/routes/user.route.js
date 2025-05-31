import express from 'express';
import {
  deleteUser,
  getUserProfile,
  googleLogin,
  login,
  logout,
  refreshToken,
  RegisterUser,
  updateUserProfile,
  verifyLoginOTP,
  verifyUserOTP
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// ✅ Public Routes
router.post('/google-login', googleLogin);               // Google OAuth login
router.post('/register', RegisterUser);                  // Register user and send OTP
router.post('/verify-otp', verifyUserOTP);  // Verify OTP after registration
router.post('/login', login);                            // Login with email/password (sends OTP if needed)
router.post('/verify-otp', verifyLoginOTP);        // Verify OTP after login
router.post('/logout', logout);                          // Logout (invalidate refresh token)
router.post('/refresh', refreshToken);                   // Refresh access token

// ✅ Protected Routes (require authentication)
router.get('/me', authenticate, getUserProfile);         // Get current user profile
router.put('/me', authenticate, updateUserProfile);      // Update profile
router.delete('/me', authenticate, deleteUser);          // Delete account

export default router;
