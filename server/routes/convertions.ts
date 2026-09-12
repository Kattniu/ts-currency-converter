/**
 * ROUTES: convertions.ts
 * PURPOSE: Solo conecta URLs con controllers
 */

import express from "express";
import { saveConversion, getConversions } from "../controllers/conversionController";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyToken, saveConversion);
router.get("/", verifyToken, getConversions);

export { router as conversionRoutes };