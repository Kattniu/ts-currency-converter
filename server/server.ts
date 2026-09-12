import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./db";
import { userRoutes } from "./routes/users";
import { conversionRoutes } from "./routes/convertions";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Solo sirve desde dist/public — generado por Vite
app.use(express.static(path.join(process.cwd(), "dist/public")));

// Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/conversions", conversionRoutes);

// Sirve manifest.json
app.get("/manifest.json", (req, res) => {
    res.sendFile(path.join(process.cwd(), "manifest.json"));
});

// Sirve service-worker.js
app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.join(process.cwd(), "service-worker.js"));
});


//Cualquier ruta no encontrada sirve el index.html
app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(process.cwd(), "dist/public/src/pages/index.html"));
});

async function startServer(): Promise<void> {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();
export default app;