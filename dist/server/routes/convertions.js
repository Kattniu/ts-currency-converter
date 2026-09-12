"use strict";
/**
 * ROUTES: convertions.ts
 * PURPOSE: Solo conecta URLs con controllers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const conversionController_1 = require("../controllers/conversionController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.conversionRoutes = router;
router.post("/", auth_1.verifyToken, conversionController_1.saveConversion);
router.get("/", auth_1.verifyToken, conversionController_1.getConversions);
