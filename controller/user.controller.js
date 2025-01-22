import { User } from "../models/user.model.js";

const registeruser = async (req, res) => {
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

export { registeruser };
