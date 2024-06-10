import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log("token: ", token);

        // If no token is found, throw an unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("decodedToken: ", decodedToken);
        // Find the user by the ID from the decoded token, excluding password and refreshToken fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // console.log("look for password `(auth.middleware.js)` file: ", user)

        // If no user is found, throw an invalid access token error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Add the user object to the request object
        req.user = user;
        next();
    } catch (error) {
        // Catch any errors and throw an unauthorized error
        throw new ApiError(401, error?.message || "Invalid access Token");
    }
});
