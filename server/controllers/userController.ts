/**
 * CONTROLLER: userController.ts
 * PURPOSE: Contiene toda la lógica de usuarios
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

// --- Registrar usuario ---
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: "Email already registered." });
        }

        // Encripta la contraseña
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

        // Compara la contraseña con el hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        res.json({ message: "Login successful!", user });

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