import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import Captain from "../models/captain.model.js";
import BlacklistToken from "../models/blacklisttoken.model.js";


export const auth = async (req, res, next) => {
    try {
        // Get token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted." });
        }

        // Verify token and extract user ID
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from the database
        const user = await User.findById(decode._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Attach user to the request object
        req.user = user;

        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        }
        return res.status(500).json({ message: "Internal server error." });
    }
};



export const capauth=async(req,res,next)=>{

    try {
        // Get token from cookies or authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        // Check if token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token blacklisted." });
        }

        // Verify token and extract user ID
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from the database
        const captain = await Captain.findById(decode._id);
        if (!captain) {
            return res.status(404).json({ message: "Captain not found." });
        }

        // Attach user to the request object
        req.captain = captain;

        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please log in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        }
        return res.status(500).json({ message: "Internal server error." });
    }
}
