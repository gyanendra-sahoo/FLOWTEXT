import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { User } from "../models/users.model.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token) {
            throw new ErrorHandler(401, "Unauthorized request");
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodeToken?.id).select("-password");
        if(!user) {
            throw new ErrorHandler(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ErrorHandler(401, error?.message || "Invalid Access Token");
    }
});
