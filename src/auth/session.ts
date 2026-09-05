/**
 * FILE: auth/session.ts
 * PURPOSE: Control de sesión y autenticación
 */

import { LoggedUser } from "../interfaces/types";

// Obtiene el usuario logueado del localStorage
export function getLoggedUser(): LoggedUser | null {
    const raw = localStorage.getItem("loggedUser");
    if (!raw) return null;
    return JSON.parse(raw);
}

// Guarda el usuario en localStorage después del login
export function saveUserSession(user: LoggedUser): void {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

// Verifica que haya sesión — si no redirige al login
export function requireAuth(): void {
    if (!getLoggedUser()) {
        window.location.href = "login.html";
    }
}

// Cierra la sesión y redirige al login
export function logout(): void {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}