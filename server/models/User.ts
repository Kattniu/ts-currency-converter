/**
 * MODEL: User.ts
 * PURPOSE: Define cómo se guarda un usuario en MongoDB
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:  { type: String, required: true },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    createdAt: { type: String, default: new Date().toLocaleTimeString() }
});

const User = mongoose.model("User", userSchema);

export default User;