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
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const loginSuccess = document.getElementById("loginSuccess");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const icon = toggleLoginPassword === null || toggleLoginPassword === void 0 ? void 0 : toggleLoginPassword.querySelector("i");
function validateLogin(email, password) {
    const errors = [];
    if (email.trim() === "")
        errors.push("Email is required.");
    if (password.trim() === "")
        errors.push("Password is required.");
    return errors;
}
loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    loginError.innerHTML = "";
    loginSuccess.innerHTML = "";
    const email = loginEmail.value;
    const password = loginPassword.value;
    const errors = validateLogin(email, password);
    if (errors.length > 0) {
        loginError.innerHTML = errors
            .map(e => `<p class="result-error">${e}</p>`)
            .join("");
        return;
    }
    try {
        const data = yield loginUser(email, password); // ← de apiService.ts
        if (!data || data.error) {
            loginError.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return;
        }
        saveUserSession(data.user); // ← de session.ts
        loginSuccess.innerHTML = `<p class="result-success">✅ Welcome :) ${data.user.fullName}!</p>`;
        setTimeout(() => {
            window.location.href = "converter.html";
        }, 1500);
    }
    catch (error) {
        loginError.innerHTML = `<p class="result-error">Could not connect to server.</p>`;
    }
}));
toggleLoginPassword === null || toggleLoginPassword === void 0 ? void 0 : toggleLoginPassword.addEventListener("click", () => {
    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        icon === null || icon === void 0 ? void 0 : icon.classList.replace("fa-eye", "fa-eye-slash");
    }
    else {
        loginPassword.type = "password";
        icon === null || icon === void 0 ? void 0 : icon.classList.replace("fa-eye-slash", "fa-eye");
    }
});
