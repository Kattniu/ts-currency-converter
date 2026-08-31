/**
 * MODEL: Conversion.ts
 * PURPOSE: Define cómo se guarda una conversión en MongoDB
 */

import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
    user:      { type: String, default: "anonymous" },
    from:      { type: String, required: true },
    to:        { type: String, required: true },
    amount:    { type: Number, required: true },
    result:    { type: Number, required: true },
    timestamp: { type: String, default: new Date().toLocaleTimeString() }
});

const Conversion = mongoose.model("Conversion", conversionSchema);

export default Conversion;