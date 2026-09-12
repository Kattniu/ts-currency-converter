/**
 * FILE: middleware/auth.ts
 * PURPOSE: Verifica que el token JWT sea válido
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    // El token viene en el header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.userId    = decoded.userId;
        req.userEmail = decoded.email;
        next(); // ← continúa a la ruta
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
};