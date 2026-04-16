"use strict";
/**
 * FILE: routes/users.ts
 * PURPOSE: Handles all API routes for users
 * (registration, login, and fetching user list)
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
exports.userRoutes = void 0;

// Import express to create routes
const express_1 = __importDefault(require("express"));
// Import mongoose to connect with MongoDB
const mongoose_1 = __importDefault(require("mongoose"));

// Create a "router" - it acts like a mini-server that handles
// only user-related routes
const router = express_1.default.Router();
exports.userRoutes = router;

// ============================================================
// 1. SCHEMA - Tells MongoDB how to store each user
// Think of it as an interface but for the database
// ============================================================
const userSchema = new mongoose_1.default.Schema({
    // Full name - mandatory
    fullName: { type: String, required: true },
    // Email - mandatory and unique (cannot be repeated)
    email: { type: String, required: true, unique: true },
    // Password - mandatory
    password: { type: String, required: true },
    // Registration time - filled automatically
    createdAt: { type: String, default: new Date().toLocaleTimeString() }
});

// ============================================================
// 2. MODEL - This is the "collection" in MongoDB
// Think of it like a table in a standard database
// Mongoose will automatically create a collection named "users"
// ============================================================
const User = mongoose_1.default.model("User", userSchema);

// ============================================================
// 3. ROUTES - These are the "endpoints" called by the frontend
// ============================================================

// --- ROUTE 1: POST /api/users ---
// Called when someone registers in register.html
// Saves the new user to MongoDB
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Read data coming from the registration form
        const { fullName, email, password } = req.body;
        
        // Check if the email already exists in the database
        const existing = yield User.findOne({ email });
        if (existing) {
            // If it exists, return a 400 error
            return res.status(400).json({ error: "Email already registered." });
        }
        
        // Create the new user with form data
        const newUser = new User({ fullName, email, password });
        
        // Save the user in MongoDB
        yield newUser.save();
        
        // Return success with the created user data
        res.status(201).json({
            message: "User registered successfully!",
            user: newUser
        });
    }
    catch (error) {
        // If something goes wrong on the server, return a 500 error
        res.status(500).json({ error: "Server error." });
    }
}));

// --- ROUTE 2: POST /api/users/login ---
// Called when someone tries to log in via login.html
// Verifies that email and password are correct
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Read email and password from the form
        const { email, password } = req.body;
        
        // Find the user by email in MongoDB
        const user = yield User.findOne({ email });
        
        // If email is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ error: "Email not found." });
        }
        
        // Compare the entered password with the stored one
        // (In the future, use encryption for better security)
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }
        
        // If everything is correct, return success with user data
        res.json({ message: "Login successful!", user });
    }
    catch (error) {
        // If something goes wrong on the server, return a 500 error
        res.status(500).json({ error: "Server error." });
    }
}));

// --- ROUTE 3: GET /api/users ---
// Called when we want to see all registered users
// For example, to display the list in register.html
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all users in MongoDB
        const users = yield User.find();
        
        // Return the full list
        res.json(users);
    }
    catch (error) {
        // If something goes wrong on the server, return a 500 error
        res.status(500).json({ error: "Server error." });
    }
}));