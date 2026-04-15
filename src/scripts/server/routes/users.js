"use strict";
/**
 * FILE: routes/users.ts
 * PURPOSE: Maneja todas las rutas de la API para usuarios
 * (registro, login, y obtener lista de usuarios)
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
exports.userRoutes = void 0;
// Importamos express para crear las rutas
const express_1 = __importDefault(require("express"));
// Importamos mongoose para conectar con MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
// Creamos un "router" - es como un mini servidor que maneja
// solo las rutas de usuarios
const router = express_1.default.Router();
exports.userRoutes = router;
// ============================================================
// 1. SCHEMA - Le dice a MongoDB cómo guardar cada usuario
// Es como una interfaz pero para la base de datos
// ============================================================
const userSchema = new mongoose_1.default.Schema({
    // Nombre completo - obligatorio
    fullName: { type: String, required: true },
    // Email - obligatorio y único (no puede repetirse)
    email: { type: String, required: true, unique: true },
    // Contraseña - obligatoria
    password: { type: String, required: true },
    // Hora de registro - se llena automáticamente
    createdAt: { type: String, default: new Date().toLocaleTimeString() }
});
// ============================================================
// 2. MODEL - Es la "colección" en MongoDB
// Piénsalo como una tabla en una base de datos normal
// Mongoose creará automáticamente una colección llamada "users"
// ============================================================
const User = mongoose_1.default.model("User", userSchema);
// ============================================================
// 3. RUTAS - Son los "endpoints" que el frontend llama
// ============================================================
// --- RUTA 1: POST /api/users ---
// Se llama cuando alguien se registra en register.html
// Guarda el nuevo usuario en MongoDB
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Leemos los datos que vienen del formulario de registro
        const { fullName, email, password } = req.body;
        // Verificamos si el email ya existe en la base de datos
        const existing = yield User.findOne({ email });
        if (existing) {
            // Si ya existe, devolvemos error 400
            return res.status(400).json({ error: "Email already registered." });
        }
        // Creamos el nuevo usuario con los datos del formulario
        const newUser = new User({ fullName, email, password });
        // Guardamos el usuario en MongoDB
        yield newUser.save();
        // Devolvemos éxito con los datos del usuario creado
        res.status(201).json({
            message: "User registered successfully!",
            user: newUser
        });
    }
    catch (error) {
        // Si algo sale mal en el servidor, devolvemos error 500
        res.status(500).json({ error: "Server error." });
    }
}));
// --- RUTA 2: POST /api/users/login ---
// Se llama cuando alguien intenta hacer login en login.html
// Verifica que el email y contraseña sean correctos
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Leemos el email y contraseña que vienen del formulario
        const { email, password } = req.body;
        // Buscamos el usuario por email en MongoDB
        const user = yield User.findOne({ email });
        // Si no encontramos el email, devolvemos error 404
        if (!user) {
            return res.status(404).json({ error: "Email not found." });
        }
        // Comparamos la contraseña ingresada con la guardada
        // (En el futuro usaremos encriptación para más seguridad)
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }
        // Si todo está bien, devolvemos éxito con los datos del usuario
        res.json({ message: "Login successful!", user });
    }
    catch (error) {
        // Si algo sale mal en el servidor, devolvemos error 500
        res.status(500).json({ error: "Server error." });
    }
}));
// --- RUTA 3: GET /api/users ---
// Se llama cuando queremos ver todos los usuarios registrados
// Por ejemplo para mostrar la lista en register.html
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Buscamos todos los usuarios en MongoDB
        const users = yield User.find();
        // Devolvemos la lista completa
        res.json(users);
    }
    catch (error) {
        // Si algo sale mal en el servidor, devolvemos error 500
        res.status(500).json({ error: "Server error." });
    }
}));
