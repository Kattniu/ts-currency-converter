/**
 * CONTROLLER: conversionController.ts
 * PURPOSE: Contiene toda la lógica de conversiones
 */

import { Request, Response } from "express";
import Conversion from "../models/Conversion";

// --- Guardar conversión ---
export const saveConversion = async (req: Request, res: Response) => {
    try {
        const { user, from, to, amount, result, timestamp } = req.body;

        const newConversion = new Conversion({ 
            user, from, to, amount, result, timestamp 
        });
        await newConversion.save();

        res.status(201).json({ 
            message: "Conversion saved!", 
            conversion: newConversion 
        });

    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};

// --- Obtener todas las conversiones ---
export const getConversions = async (req: Request, res: Response) => {
    try {
        const user = req.query.user as string;

        const conversions = await Conversion
            .find({ user: user })  // ← filtra por usuario
            .sort({ _id: -1 })     // ← más recientes primero
            .limit(3);             // ← solo las últimas 3

        res.json(conversions);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};