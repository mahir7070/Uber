import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password by default
    },
    socketId: {
        type: String,
    },
});

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
};

// Static method to generate auth token
userSchema.statics.generateAuthToken = function (userId) {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const User = mongoose.model("User", userSchema);
export { User };
