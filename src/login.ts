/**
 * FILE: login.ts
 * PURPOSE: Handles user login and redirects to converter
 */

// ============================================================
// DOM LOGIC - Connects login form to the backend
// ============================================================

// Select all HTML elements needed
const loginBtn      = document.getElementById("loginBtn")      as HTMLButtonElement;
const loginEmail    = document.getElementById("loginEmail")    as HTMLInputElement;
const loginPassword = document.getElementById("loginPassword") as HTMLInputElement;
const loginError    = document.getElementById("loginError")    as HTMLDivElement;
const loginSuccess  = document.getElementById("loginSuccess")  as HTMLDivElement;

// --- Function: validates login fields are not empty ---
function validateLogin(email: string, password: string): string[] {
    const errors: string[] = [];

    if (email.trim() === "") {
        errors.push("Email is required.");
    }

    if (password.trim() === "") {
        errors.push("Password is required.");
    }

    return errors;
}

// --- Event Listener: fires when Login button is clicked ---
loginBtn?.addEventListener("click", async () => {

    // Clear previous messages
    loginError.innerHTML   = "";
    loginSuccess.innerHTML = "";

    const email    = loginEmail.value;
    const password = loginPassword.value;

    // Validate fields first
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
        loginError.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return;
    }

    try {
        // Check if user exists in MongoDB via our API
        const response = await fetch("https://ts-currency-converter.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // Show error if credentials are wrong
            loginError.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }

        // Save user session in localStorage
        localStorage.setItem("loggedUser", JSON.stringify(data.user));

        // Show success and redirect to converter
        loginSuccess.innerHTML = `<p class="result-success">✅ Welcome ${data.user.fullName}! Redirecting...</p>`;

        setTimeout(() => {
            window.location.href = "converter.html";
        }, 1500);

    } catch (error) {
        loginError.innerHTML = `<p class="result-error">⚠️ Could not connect to server.</p>`;
    }
});