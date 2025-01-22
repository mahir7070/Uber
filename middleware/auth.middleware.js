import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const auth = async (req, res, next) => {
    try {
        // Retrieve token from cookies or authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });

        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted." });
        }

        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by decoded token's ID
        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach user object to the request for downstream usage
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message || error);
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
};
