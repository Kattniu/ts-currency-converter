/**
 * ROUTES: users.ts
 * PURPOSE: Solo conecta URLs con controllers
 */

import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);

export { router as userRoutes };