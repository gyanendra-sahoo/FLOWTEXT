import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// Register user route
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;