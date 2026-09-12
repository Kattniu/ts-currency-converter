/**
 * CONTROLLER: userController.ts
 * PURPOSE: Contiene toda la lógica de usuarios
 */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// --- Registrar usuario ---
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            message: "User registered successfully!", 
            user: newUser 
        });

    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};

// --- Login ---
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Email not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // ✅ Genera el token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ 
            message: "Login successful!", 
            user,
            token
        });

    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};

// --- Obtener todos los usuarios ---
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};