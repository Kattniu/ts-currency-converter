"use strict";
/**
 * FILE: register.ts
 * PURPOSE: Handles user registration and saves to MongoDB via API
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
// 2. VALIDATION - Checks form fields before sending to server
// ============================================================
// --- Function: validates all form fields ---
function validate(fullName, email, password) {
    const errors = [];
    if (fullName.trim() === "") {
        errors.push("Full name is required.");
    }
    if (!email.includes("@") || !email.includes(".")) {
        errors.push("Please enter a valid email address.");
    }
    if (password.length < 6) {
        errors.push("Password must be at least 6 characters.");
    }
    return errors;
}
// ============================================================
// 3. DOM LOGIC - Connects form to the API
// ============================================================
// Select all HTML elements
const registerBtn = document.getElementById("registerBtn");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorDisplay = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("successDisplay");
const usersList = document.getElementById("usersList");
// --- Function: loads and displays all registered users from MongoDB ---
function updateUsersUI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/api/users");
            const users = yield response.json();
            usersList.innerHTML = "";
            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "history-item";
                li.innerHTML = `
                👤 <strong>${user.fullName}</strong> — ${user.email}
                <br>
                <small>Registered at: ${user.createdAt}</small>
            `;
                usersList.appendChild(li);
            });
        }
        catch (error) {
            console.error("Could not load users:", error);
        }
    });
}
// --- Event Listener: fires when Register button is clicked ---
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    // Clear previous messages
    errorDisplay.innerHTML = "";
    successDisplay.innerHTML = "";
    // Validate fields first
    const errors = validate(fullName, email, password);
    if (errors.length > 0) {
        errorDisplay.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return;
    }
    try {
        // Send data to MongoDB via our API
        const response = yield fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password })
        });
        const data = yield response.json();
        if (!response.ok) {
            // Show error from server
            errorDisplay.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }
        // Show success and redirect to login
        successDisplay.innerHTML = `
            <p class="result-success">✅ Welcome ${data.user.fullName}! Redirecting to login...</p>
        `;
        // Clear form
        fullNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        // Refresh users list
        updateUsersUI();
        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
    catch (error) {
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server. Make sure the server is running.</p>`;
    }
}));
// Load users when page opens
updateUsersUI();
