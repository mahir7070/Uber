import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Prevents password from being returned in queries
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'bike'],
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        },
    },
});


captainSchema.methods.generatetoken=function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

// Export the model
const Captain = mongoose.model('Captain', captainSchema);
export default Captain;
