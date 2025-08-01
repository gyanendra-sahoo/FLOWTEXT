import { User } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/ResponseHandler.js";
import { ErrorHandler } from "../utils/errorHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    throw new ErrorHandler(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorHandler(400, "User already exists with this email");
  }

  const user = await User.create({ email, fullName, password });

  const safeUser = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  const response = new ResponseHandler(
    200,
    safeUser,
    "User registered successfully"
  );
  return res.status(response.statusCode).json(response);
});

export { registerUser };
