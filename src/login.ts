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

const toggleLoginPassword = document.getElementById("toggleLoginPassword") as HTMLButtonElement;
const icon = toggleLoginPassword.querySelector("i");

// --- Function: validates login fields are not empty ---
//creamos una función para validar que los campos de correo electrónico y contraseña no estén vacíos
function validateLogin(email: string, password: string): string[] 
//la función toma dos parámetros: email y password, ambos de tipo string, y devuelve un array de strings que contiene los mensajes de error si los campos están vacíos
{
    const errors: string[] = []; //creamos array vacio para almacenar mensajes de error

    if (email.trim() === "") {
        errors.push("Email is required.");
    }
    //.trim() elimina espacios en blanco al principio y al final de la cadena, y si la cadena resultante está vacía, se agrega un mensaje de error al array errors.
    if (password.trim() === "") {
        errors.push("Password is required.");
    }
    //si la contraseña está vacía, se agrega otro mensaje de error al array errors.
    return errors;
}

// --- Event Listener: fires when Login button is clicked ---
loginBtn?.addEventListener("click", async () => {
// el ? significa que si loginBtn es null o undefined, no se ejecutará el código dentro del bloque de la función. Esto evita errores si el elemento no existe en el DOM.

    // Clear previous messages
    loginError.innerHTML   = ""; //Borramos mensajes viejos 
    loginSuccess.innerHTML = ""; //ejemplo : wrong password --> "" vacio

    const email    = loginEmail.value;
    const password = loginPassword.value;

    // Validate fields first
    const errors = validateLogin(email, password);
    if (errors.length > 0) { //significa ["Email is required."]
        loginError.innerHTML = errors
            .map(e => `<p class="result-error"> ${e}</p>`)// convierte cada mensaje de error en un párrafo HTML con la clase "result-error"
            .join(""); //une todos los errores 
        return;
    }

    try {
        // Check if user exists in MongoDB via our API
        const response = await fetch("https://ts-currency-converter.onrender.com/api/users/login", {
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
        loginSuccess.innerHTML = `<p class="result-success">✅ Welcome :) ${data.user.fullName}! Redirecting...</p>`;

        setTimeout(() => {
            window.location.href = "converter.html";
        }, 1500);

    } catch (error) {
        loginError.innerHTML = `<p class="result-error">Could not connect to server.</p>`;
    }
});

toggleLoginPassword?.addEventListener("click", () => {

    if (loginPassword.type === "password") {
        loginPassword.type = "text";
        icon?.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        loginPassword.type = "password";
        icon?.classList.replace("fa-eye-slash", "fa-eye");
    }
});