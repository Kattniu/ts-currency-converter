/**
 * FILE: login.ts
 * PURPOSE: Handles user login and redirects to converter
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
// ============================================================
// DOM LOGIC - Connects login form to the backend
// ============================================================
// Select all HTML elements needed
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");
// --- Function: validates login fields are not empty ---
function validateLogin(email, password) {
    const errors = [];
    if (email.trim() === "") {
        errors.push("Email is required.");
    }
    if (password.trim() === "") {
        errors.push("Password is required.");
    }
    return errors;
}
// --- Event Listener: fires when Login button is clicked ---
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
    // Clear previous messages
    loginError.innerHTML = "";
    loginSuccess.innerHTML = "";
    const email = loginEmail.value;
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
        const response = yield fetch("https://ts-currency-converter.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = yield response.json();
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
    }
    catch (error) {
        loginError.innerHTML = `<p class="result-error">⚠️ Could not connect to server.</p>`;
    }
}));
