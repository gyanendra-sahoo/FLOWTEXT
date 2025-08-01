import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

// Register user route
userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(verifyToken, logoutUser);

export default userRouter;