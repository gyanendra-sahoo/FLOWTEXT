import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Register user route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyToken, logoutUser);

export default router;