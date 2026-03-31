/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 * File: register.ts - Handles user registration with validation
 */

// ============================================================
// 1. INTERFACES - Define the shape of our data
// ============================================================

// Defines the structure of a registered user
interface User {
    id: number;
    fullName: string;
    email: string;
    createdAt: string;
}

// ============================================================
// 2. CLASS - Contains all registration logic
// ============================================================

class UserRegistry {

    // --- Attributes ---
    private users: User[] = [];     // Array to store registered users in memory
    private nextId: number = 1;     // Auto-increments ID for each new user

    // --- Method: validates all form fields before registering ---
    public validate(fullName: string, email: string, password: string): string[] {
        const errors: string[] = [];

        // Check that full name is not empty
        if (fullName.trim() === "") {
            errors.push("Full name is required.");
        }

        // Check that email contains @ and a dot
        if (!email.includes("@") || !email.includes(".")) {
            errors.push("Please enter a valid email address.");
        }

        // Check that password has at least 6 characters
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }

        return errors;
    }

    // --- Method: registers a new user and saves it to the array ---
    public register(fullName: string, email: string): User {

        // Check if email is already registered
        const exists = this.users.find(u => u.email === email);
        if (exists) {
            throw new Error("This email is already registered.");
        }

        // Create a new user object
        const newUser: User = {
            id: this.nextId++,
            fullName,
            email,
            createdAt: new Date().toLocaleTimeString()
        };

        // Save user to array
        this.users.push(newUser);
        return newUser;
    }

    // --- Method: returns all registered users ---
    public getUsers(): User[] {
        return this.users;
    }
}

// ============================================================
// 3. DOM LOGIC - Connects the class to the HTML interface
// ============================================================

// Create one instance of the registry
const registry = new UserRegistry();

// Select all HTML elements we need
const registerBtn    = document.getElementById("registerBtn")   as HTMLButtonElement;
const fullNameInput  = document.getElementById("fullName")      as HTMLInputElement;
const emailInput     = document.getElementById("email")         as HTMLInputElement;
const passwordInput  = document.getElementById("password")      as HTMLInputElement;
const errorDisplay   = document.getElementById("errorDisplay")  as HTMLDivElement;
const successDisplay = document.getElementById("successDisplay") as HTMLDivElement;
const usersList      = document.getElementById("usersList")     as HTMLUListElement;

// --- Function: updates the registered users list in the UI ---
function updateUsersUI(): void {
    usersList.innerHTML = ""; // Clear before re-rendering

    registry.getUsers().forEach(user => {
        const li = document.createElement("li");

        // Use CSS class for styling
        li.className = "history-item";

        // Build the list item with user details
        li.innerHTML = `
            👤 <strong>${user.fullName}</strong> — ${user.email}
            <br>
            <small>Registered at: ${user.createdAt}</small>
        `;

        usersList.appendChild(li);
    });
}

// --- Event Listener: fires when Register button is clicked ---
registerBtn?.addEventListener("click", () => {

    // Read values from the form inputs
    const fullName = fullNameInput.value;
    const email    = emailInput.value;
    const password = passwordInput.value;

    // Clear previous messages
    errorDisplay.innerHTML  = "";
    successDisplay.innerHTML = "";

    // Run validation first
    const errors = registry.validate(fullName, email, password);

    // If there are errors, show them and stop
    if (errors.length > 0) {
        errorDisplay.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return;
    }

    // Try to register the user
    try {
        const newUser = registry.register(fullName, email);

        // Show success message
        successDisplay.innerHTML = `
            <p class="result-success">✅ Welcome, ${newUser.fullName}! Your account has been created.</p>
        `;

        // Clear form inputs after successful registration
        fullNameInput.value  = "";
        emailInput.value     = "";
        passwordInput.value  = "";

        // Refresh the users list
        updateUsersUI();

    } catch (error: any) {
        // Show error if email already exists
        errorDisplay.innerHTML = `<p class="result-error">⚠️ ${error.message}</p>`;
    }
});