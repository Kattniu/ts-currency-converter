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
        const conversions = await Conversion.find();
        res.json(conversions);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
};