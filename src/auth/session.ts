import { LoggedUser } from "../interfaces/types";

export function getLoggedUser(): LoggedUser | null {
    const raw = localStorage.getItem("loggedUser");
    if (!raw) return null;
    return JSON.parse(raw);
}

export function getToken(): string | null {
    return localStorage.getItem("token"); // guarda el token
}

export function saveUserSession(user: LoggedUser, token: string): void {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    localStorage.setItem("token", token); // guarda el token
}

export function requireAuth(): void {
    if (!getLoggedUser()) {
        window.location.href = "/src/pages/login.html";
    }
}

export function logout(): void {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");   
    window.location.href = "/src/pages/login.html";
}