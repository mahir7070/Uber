import mongoose from "mongoose";

const dbconect=async()=>{
   try {
    const connectionInstance=await  mongoose.connect(process.env.DB_CONNECT)
    console.log(`MongoDB connected on host: ${connectionInstance.connection.host}`);
   } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
   }
}

export default dbconect;

