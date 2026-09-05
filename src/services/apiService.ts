/**
 * FILE: services/apiService.ts
 * PURPOSE: Toda la comunicación con la API
 */

import { ConversionRecord } from "../interfaces/types";

const API_URL = "https://ts-currency-converter.onrender.com";

// Guarda una conversión en MongoDB
export async function saveConversion(
    user: string,
    from: string,
    to: string,
    amount: number,
    result: number
): Promise<void> {
    await fetch(`${API_URL}/api/conversions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user, from, to, amount, result,
            timestamp: new Date().toLocaleTimeString()
        })
    });
}

// Trae las últimas 5 conversiones del usuario desde MongoDB
export async function fetchUserConversions(user: string): Promise<ConversionRecord[]> {
    const response = await fetch(
        `${API_URL}/api/conversions?user=${encodeURIComponent(user)}`
    );
    return await response.json();
}

// Registra un usuario nuevo
export async function registerUser(
    fullName: string,
    email: string,
    password: string
): Promise<any> {
    const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
    });
    return await response.json();
}

// Login de usuario
export async function loginUser(
    email: string,
    password: string
): Promise<any> {
    const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}

// Trae todos los usuarios
export async function fetchUsers(): Promise<any[]> {
    const response = await fetch(`${API_URL}/api/users`);
    return await response.json();
}