import { User } from '../models/users.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import responseHandler from '../utils/responseHandler.js';

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    return next(new Error('All fields are required'));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new Error('User already exists'));
  }

  const user = await User.create({ email, fullName, password });

  const safeUser = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  responseHandler(res, safeUser, 'User registered successfully', 201);
});

export {
  registerUser,
};
