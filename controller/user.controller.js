import { User } from "../models/user.model.js";
import BlacklistToken from "../models/blacklisttoken.model.js";

const registeruser = async (req, res,next) => {
    try {
        const { fullname, password, email } = req.body;

        // Validate required fields
        if (!fullname || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Hash the password
        const hashedPassword = await User.hashPassword(password);

        // Create the user in the database
        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
        });

        // Generate an authentication token
        const token = User.generateAuthToken(createdUser._id);

        // Return success response
        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in registeruser:", error.message || error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



const loginuser = async (req, res,next) => {
    try {
        const {password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const ispassword = await user.comparePassword(password);

        if (!ispassword) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = await User.generateAuthToken(user._id);

        return res.status(200).json({
            message: "Login successful.",
            token
        });

    } catch (error) {
        console.error("Error in loginuser:", error.message || error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
 const getuserprofile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Send the user details
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in getuserprofile:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const logoutuser = async (req, res) => {
    res.clearCookie("token");
    const token=req.cookies.token||req.headers.authorization.split(" ")[1];
    
    await BlacklistToken.create({ token });

    res.status(200).json({ message: "Logout successful." });
}


export { registeruser, loginuser,getuserprofile ,logoutuser}


