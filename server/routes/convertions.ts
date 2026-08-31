/**
 * ROUTES: convertions.ts
 * PURPOSE: Solo conecta URLs con controllers
 */

import express from "express";
import { saveConversion, getConversions } from "../controllers/conversionController";

const router = express.Router();

router.post("/", saveConversion);
router.get("/", getConversions);

export { router as conversionRoutes };