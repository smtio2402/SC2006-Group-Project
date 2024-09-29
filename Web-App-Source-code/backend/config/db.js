//connect database here
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export const connectDB = async () => {
    try{
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
    console.error("Error connecting to MongoDB:", error.message); // Log the actual error
    process.exit(1);
    }
};