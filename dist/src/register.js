"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Sin imports
const registerBtn = document.getElementById("registerBtn");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorDisplay = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("successDisplay");
const usersList = document.getElementById("usersList");
const togglePassword = document.getElementById("togglePassword");
function validate(fullName, email, password) {
    const errors = [];
    if (fullName.trim() === "")
        errors.push("Full name is required.");
    if (!email.includes("@") || !email.includes("."))
        errors.push("Please enter a valid email.");
    if (password.length < 6)
        errors.push("Password must be at least 6 characters.");
    return errors;
}
function updateUsersUI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield fetchUsers(); // ← de apiService.ts
            usersList.innerHTML = "";
            users.forEach((user) => {
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
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    errorDisplay.innerHTML = "";
    successDisplay.innerHTML = "";
    const errors = validate(fullName, email, password);
    if (errors.length > 0) {
        errorDisplay.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return;
    }
    try {
        const data = yield registerUser(fullName, email, password); // ← de apiService.ts
        if (!data || data.error) {
            errorDisplay.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }
        successDisplay.innerHTML = `
            <p class="result-success">✅ Welcome ${data.user.fullName}!</p>
        `;
        fullNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        updateUsersUI();
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
    catch (error) {
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server.</p>`;
    }
}));
if (togglePassword)
    togglePassword.textContent = "View";
togglePassword === null || togglePassword === void 0 ? void 0 : togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "View" : "Hide";
});
updateUsersUI();
