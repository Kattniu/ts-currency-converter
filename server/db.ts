/**
 * FILE: db.ts
 * PURPOSE: Connects to MongoDB Atlas using Mongoose
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// --- Function: connects to MongoDB Atlas ---
export async function connectDB(): Promise<void> {
    try {
        const uri = process.env.MONGODB_URI as string;
        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}