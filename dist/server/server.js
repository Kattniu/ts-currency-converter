"use strict";
/**
 * FILE: server.ts
 * PURPOSE: Main Express server - handles all API requests
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const users_1 = require("./routes/users");
const convertions_1 = require("./routes/convertions");
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// --- Middleware: allows JSON and cross-origin requests ---
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- 1. Servir archivos estáticos (CSS, JS del frontend, Imágenes) ---
// Esto hace que si pides "styles/style.css", Express lo busque en "src/styles"
app.use(express_1.default.static(path_1.default.join(process.cwd(), "src")));
// --- Routes: connect URL paths to their handlers ---
app.use("/api/users", users_1.userRoutes);
app.use("/api/conversions", convertions_1.conversionRoutes);
// --- 3. Servir el HTML principal ---
// Cuando alguien entre a tu URL, le mandamos el index.html
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), "src/pages/index.html"));
});
(0, db_1.connectDB)();
exports.default = app;
