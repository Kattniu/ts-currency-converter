/**
 * FILE: server.ts
 * PURPOSE: Main Express server - handles all API requests
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { userRoutes } from "./routes/users";
import { conversionRoutes } from "./routes/convertions";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware: allows JSON and cross-origin requests ---
app.use(cors());
app.use(express.json());

// --- Routes: connect URL paths to their handlers ---
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);

// --- Start: connects to DB then starts the server ---
async function startServer(): Promise<void> {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

startServer();