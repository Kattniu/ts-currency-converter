/**
 * FILE: register.ts
 * PURPOSE: Gerente de la página register — solo une todo
 */

import { registerUser, fetchUsers } from "./services/apiService";

// Elementos del DOM
const registerBtn    = document.getElementById("registerBtn")    as HTMLButtonElement;
const fullNameInput  = document.getElementById("fullName")       as HTMLInputElement;
const emailInput     = document.getElementById("email")          as HTMLInputElement;
const passwordInput  = document.getElementById("password")       as HTMLInputElement;
const errorDisplay   = document.getElementById("errorDisplay")   as HTMLDivElement;
const successDisplay = document.getElementById("successDisplay") as HTMLDivElement;
const usersList      = document.getElementById("usersList")      as HTMLUListElement;
const togglePassword = document.getElementById("togglePassword") as HTMLButtonElement;

// Validación
function validate(fullName: string, email: string, password: string): string[] {
    const errors: string[] = [];
    if (fullName.trim() === "") errors.push("Full name is required.");
    if (!email.includes("@") || !email.includes(".")) errors.push("Please enter a valid email address.");
    if (password.length < 6) errors.push("Password must be at least 6 characters.");
    return errors;
}

// Mostrar usuarios
async function updateUsersUI(): Promise<void> {
    try {
        const users = await fetchUsers();
        usersList.innerHTML = "";
        users.forEach((user: any) => {
            const li = document.createElement("li");
            li.className = "history-item";
            li.innerHTML = `
                👤 <strong>${user.fullName}</strong> — ${user.email}
                <br>
                <small>Registered at: ${user.createdAt}</small>
            `;
            usersList.appendChild(li);
        });
    } catch (error) {
        console.error("Could not load users:", error);
    }
}

// Registro
registerBtn?.addEventListener("click", async () => {
    const fullName = fullNameInput.value;
    const email    = emailInput.value;
    const password = passwordInput.value;

    errorDisplay.innerHTML   = "";
    successDisplay.innerHTML = "";

    const errors = validate(fullName, email, password);
    if (errors.length > 0) {
        errorDisplay.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return;
    }

    try {
        const data = await registerUser(fullName, email, password);

        if (!data || data.error) {
            errorDisplay.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }

        successDisplay.innerHTML = `
            <p class="result-success">✅ Welcome ${data.user.fullName}! Redirecting to login...</p>
        `;

        fullNameInput.value = "";
        emailInput.value    = "";
        passwordInput.value = "";

        updateUsersUI();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server.</p>`;
    }
});

// Toggle password
if (togglePassword) togglePassword.textContent = "View";
togglePassword?.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "View" : "Hide";
});

updateUsersUI();