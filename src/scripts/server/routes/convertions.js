"use strict";
/**
 * FILE: routes/conversions.ts
 * PURPOSE: Handles all conversion history API routes
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
exports.conversionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
exports.conversionRoutes = router;
// --- Schema: defines the structure of a conversion in MongoDB ---
const conversionSchema = new mongoose_1.default.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    result: { type: Number, required: true },
    timestamp: { type: String, default: new Date().toLocaleTimeString() }
});
// --- Model: the MongoDB collection for conversions ---
const Conversion = mongoose_1.default.model("Conversion", conversionSchema);
// --- Route: POST /api/conversions - saves a conversion to MongoDB ---
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, amount, result } = req.body;
        // Save conversion to database
        const newConversion = new Conversion({ from, to, amount, result });
        yield newConversion.save();
        res.status(201).json({ message: "Conversion saved!", conversion: newConversion });
    }
    catch (error) {
        res.status(500).json({ error: "Server error." });
    }
}));
// --- Route: GET /api/conversions - returns all saved conversions ---
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversions = yield Conversion.find();
        res.json(conversions);
    }
    catch (error) {
        res.status(500).json({ error: "Server error." });
    }
}));
