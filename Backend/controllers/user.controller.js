import { User } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ResponseHandler } from "../utils/ResponseHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";


const generateAccessTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return {accessToken};
  } catch (error) {
    throw new ErrorHandler(500, "Something went wrong while generating access token");
  }
}


const registerUser = asyncHandler(async (req, res) => {
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


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorHandler(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(401, "User does not exist");
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ErrorHandler(401, "Invalid password");
  }
  const {accessToken} = await generateAccessTokens(user._id);
  const options = {
    httpOnly: true,
    secure: true
  }
  const loggedUser = await User.findById(user._id).select("-password");
  return res.status(200).cookie('accessToken', accessToken, options).json(
    new ResponseHandler(200, {
      user: loggedUser,
      accessToken
    },
    "User Logged In Successfully"
  )
  )
});


const logoutUser = asyncHandler(async (req, res) => {
    const options = {
    httpOnly: true,
    secure: true
  }
  return res.status(200)
  .clearCookie("accessToken", options)
  .json (
    new ResponseHandler(200, null, "User logged out successfully")
  )
});


export { registerUser, loginUser, logoutUser };
