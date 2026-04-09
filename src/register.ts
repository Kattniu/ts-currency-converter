/**
 * FILE: register.ts
 * PURPOSE: Handles user registration and saves to MongoDB via API
 */

// ============================================================
// 1. INTERFACES
// ============================================================

// Defines the structure of a registered user
interface User {
    fullName: string;
    email: string;
    createdAt: string;
}

// ============================================================
// 2. VALIDATION - Checks form fields before sending to server
// ============================================================

// --- Function: validates all form fields ---
function validate(fullName: string, email: string, password: string): string[] {
    const errors: string[] = [];

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
const registerBtn    = document.getElementById("registerBtn")    as HTMLButtonElement;
const fullNameInput  = document.getElementById("fullName")       as HTMLInputElement;
const emailInput     = document.getElementById("email")          as HTMLInputElement;
const passwordInput  = document.getElementById("password")       as HTMLInputElement;
const errorDisplay   = document.getElementById("errorDisplay")   as HTMLDivElement;
const successDisplay = document.getElementById("successDisplay") as HTMLDivElement;
const usersList      = document.getElementById("usersList")      as HTMLUListElement;

// --- Function: loads and displays all registered users from MongoDB ---
async function updateUsersUI(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/api/users");
        const users: User[] = await response.json();

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
    } catch (error) {
        console.error("Could not load users:", error);
    }
}

// --- Event Listener: fires when Register button is clicked ---
registerBtn?.addEventListener("click", async () => {

    const fullName = fullNameInput.value;
    const email    = emailInput.value;
    const password = passwordInput.value;

    // Clear previous messages
    errorDisplay.innerHTML   = "";
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
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

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
        fullNameInput.value  = "";
        emailInput.value     = "";
        passwordInput.value  = "";

        // Refresh users list
        updateUsersUI();

        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server. Make sure the server is running.</p>`;
    }
});

// Load users when page opens
updateUsersUI();