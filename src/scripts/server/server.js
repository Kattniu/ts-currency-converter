"use strict";
/**
 * FILE: server.ts
 * PURPOSE: Main Express server - handles all API requests
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
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
// --- Routes: connect URL paths to their handlers ---
app.use("/api/users", users_1.userRoutes);
app.use("/api/conversions", convertions_1.conversionRoutes);
// --- Start: connects to DB then starts the server ---
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    });
}
startServer();
