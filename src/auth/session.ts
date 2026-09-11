import { LoggedUser } from "../interfaces/types";

export function getLoggedUser(): LoggedUser | null {
    const raw = localStorage.getItem("loggedUser");
    if (!raw) return null;
    return JSON.parse(raw);
}

export function saveUserSession(user: LoggedUser): void {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

export function requireAuth(): void {
    if (!getLoggedUser()) {
        window.location.href = "/src/pages/login.html";
    }
}

export function logout(): void {
    localStorage.removeItem("loggedUser");
    window.location.href = "/src/pages/login.html";
}