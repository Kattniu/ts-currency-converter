/**
 * FILE: server.ts
 * PURPOSE: Main Express server - handles all API requests
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import path from "path"; 

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

// --- 1. Servir archivos estáticos (CSS, JS del frontend, Imágenes) ---
// Esto hace que si pides "styles/style.css", Express lo busque en "src/styles"
app.use(express.static(path.join(process.cwd(), "src")));


// --- Routes: connect URL paths to their handlers ---
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);

// --- 3. Servir el HTML principal ---
// Cuando alguien entre a tu URL, le mandamos el index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "src/pages/index.html"));
});

// --- Start: connects to DB then starts the server ---
async function startServer(): Promise<void> {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
export default app;