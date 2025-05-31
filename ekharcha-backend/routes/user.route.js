import express from 'express';
import {
  googleLogin,
  RegisterUser,
  login,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  deleteUser
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/google-login', googleLogin);
router.post('/register', RegisterUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

router.get('/me', authenticate, getUserProfile);
router.put('/me', authenticate, updateUserProfile);
router.delete('/me', authenticate, deleteUser);

export default router;
