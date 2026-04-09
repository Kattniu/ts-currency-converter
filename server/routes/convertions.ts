/**
 * FILE: routes/conversions.ts
 * PURPOSE: Handles all conversion history API routes
 */

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// --- Schema: defines the structure of a conversion in MongoDB ---
const conversionSchema = new mongoose.Schema({
    from:      { type: String, required: true },
    to:        { type: String, required: true },
    amount:    { type: Number, required: true },
    result:    { type: Number, required: true },
    timestamp: { type: String, default: new Date().toLocaleTimeString() }
});

// --- Model: the MongoDB collection for conversions ---
const Conversion = mongoose.model("Conversion", conversionSchema);

// --- Route: POST /api/conversions - saves a conversion to MongoDB ---
router.post("/", async (req, res) => {
    try {
        const { from, to, amount, result } = req.body;

        // Save conversion to database
        const newConversion = new Conversion({ from, to, amount, result });
        await newConversion.save();

        res.status(201).json({ message: "Conversion saved!", conversion: newConversion });

    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

// --- Route: GET /api/conversions - returns all saved conversions ---
router.get("/", async (req, res) => {
    try {
        const conversions = await Conversion.find();
        res.json(conversions);
    } catch (error) {
        res.status(500).json({ error: "Server error." });
    }
});

export { router as conversionRoutes };