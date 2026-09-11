import { registerUser } from "./services/apiService";

const registerBtn    = document.getElementById("registerBtn")    as HTMLButtonElement;
const fullNameInput  = document.getElementById("fullName")       as HTMLInputElement;
const lastNameInput  = document.getElementById("lastName")       as HTMLInputElement;
const emailInput     = document.getElementById("email")          as HTMLInputElement;
const passwordInput  = document.getElementById("password")       as HTMLInputElement;
const errorDisplay   = document.getElementById("errorDisplay")   as HTMLDivElement;
const successDisplay = document.getElementById("successDisplay") as HTMLDivElement;
const togglePassword = document.getElementById("togglePassword") as HTMLButtonElement;

function validate(
    firstName: string,
    lastName: string,
    email: string,
    password: string
): string[] {
    const errors: string[] = [];

    if (firstName.trim().length < 2) errors.push("First name must be at least 2 characters.");
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(firstName.trim())) errors.push("First name can only contain letters.");
    if (lastName.trim().length < 2) errors.push("Last name must be at least 2 characters.");
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(lastName.trim())) errors.push("Last name can only contain letters.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Please enter a valid email address.");

    if (password.length < 8) errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");

    return errors;
}

registerBtn?.addEventListener("click", async () => {
    const firstName = fullNameInput.value;
    const lastName  = lastNameInput.value;
    const fullName  = `${firstName.trim()} ${lastName.trim()}`;
    const email     = emailInput.value;
    const password  = passwordInput.value;

    errorDisplay.innerHTML   = "";
    successDisplay.innerHTML = "";

    const errors = validate(firstName, lastName, email, password);
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
            <p class="result-success">✅ Welcome ${data.user.fullName}!</p>
        `;

        fullNameInput.value = "";
        lastNameInput.value = "";
        emailInput.value    = "";
        passwordInput.value = "";

        setTimeout(() => {
            window.location.href = "/src/pages/login.html";
        }, 2000);

    } catch (error) {
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server.</p>`;
    }
});

if (togglePassword) togglePassword.textContent = "View";
togglePassword?.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "password" ? "View" : "Hide";
});