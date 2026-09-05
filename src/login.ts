/**
 * FILE: login.ts
 * PURPOSE: Gerente de la página login — solo une todo
 */

import { loginUser } from "./services/apiService";
import { saveUserSession } from "./auth/session";

// Elementos del DOM
const loginBtn      = document.getElementById("loginBtn")           as HTMLButtonElement;
const loginEmail    = document.getElementById("loginEmail")         as HTMLInputElement;
const loginPassword = document.getElementById("loginPassword")      as HTMLInputElement;
const loginError    = document.getElementById("loginError")         as HTMLDivElement;
const loginSuccess  = document.getElementById("loginSuccess")       as HTMLDivElement;
const toggleLoginPassword = document.getElementById("toggleLoginPassword") as HTMLButtonElement;
const icon = toggleLoginPassword?.querySelector("i");

// Validación
function validateLogin(email: string, password: string): string[] {
    const errors: string[] = [];
    if (email.trim() === "") errors.push("Email is required.");
    if (password.trim() === "") errors.push("Password is required.");
    return errors;
}

// Login
loginBtn?.addEventListener("click", async () => {
    loginError.innerHTML   = "";
    loginSuccess.innerHTML = "";

    const email    = loginEmail.value;
    const password = loginPassword.value;

    const errors = validateLogin(email, password);
    if (errors.length > 0) {
        loginError.innerHTML = errors
            .map(e => `<p class="result-error">${e}</p>`)
            .join("");
        return;
    }

    try {
        const data = await loginUser(email, password);

        if (!data || data.error) {
            loginError.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }

        saveUserSession(data.user);
        loginSuccess.innerHTML = `<p class="result-success">✅ Welcome :) ${data.user.fullName}! Redirecting...</p>`;

        setTimeout(() => {
            window.location.href = "converter.html";
        }, 1500);

    } catch (error) {
        loginError.innerHTML = `<p class="result-error">Could not connect to server.</p>`;
    }
});

// Toggle password
toggleLoginPassword?.addEventListener("click", () => {
    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        icon?.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        loginPassword.type = "password";
        icon?.classList.replace("fa-eye-slash", "fa-eye");
    }
});