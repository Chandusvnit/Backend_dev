import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // ✅ load env here



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Database connection is established");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
