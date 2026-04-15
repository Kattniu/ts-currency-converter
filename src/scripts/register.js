/**
 * ARCHIVO: register.ts
 * PROPÓSITO: Maneja el registro de usuarios y los guarda
 * en MongoDB Atlas a través de nuestra API
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
// 2. FUNCIÓN VALIDATE - Verifica los campos ANTES de enviar
// al servidor. Es mejor validar en el frontend primero
// para no hacer llamadas innecesarias a MongoDB
// ============================================================
// Recibe los 3 campos del formulario
// Devuelve un array de errores — si está vacío [] todo está bien
function validate(fullName, email, password) {
    // Array vacío donde guardaremos los errores encontrados
    const errors = [];
    // Verificación 1: el nombre no puede estar vacío
    // trim() elimina espacios en blanco al inicio y al final
    // Ejemplo: "   " → "" → está vacío → agrega error
    if (fullName.trim() === "") {
        errors.push("Full name is required.");
    }
    // Verificación 2: el email debe tener @ y un punto
    // includes() verifica si un texto contiene otro texto
    // Ejemplo: "katherine@email.com" tiene "@" y "." → válido
    // Ejemplo: "katherine" no tiene "@" → agrega error
    if (!email.includes("@") || !email.includes(".")) {
        errors.push("Please enter a valid email address.");
    }
    // Verificación 3: la contraseña debe tener al menos 6 caracteres
    // .length cuenta cuántos caracteres tiene el texto
    // Ejemplo: "abc" tiene 3 → menor que 6 → agrega error
    if (password.length < 6) {
        errors.push("Password must be at least 6 characters.");
    }
    // Devolvemos el array de errores
    // Si no hay errores devuelve [] (array vacío)
    // Si hay errores devuelve ["error1", "error2", ...]
    return errors;
}
// ============================================================
// 3. DOM - Seleccionamos todos los elementos HTML que usaremos
// getElementById busca el elemento por su id en el HTML
// "as HTML..." le dice a TypeScript qué tipo de elemento es
// ============================================================
// El botón "Create Account"
const registerBtn = document.getElementById("registerBtn");
// El campo de nombre completo
const fullNameInput = document.getElementById("fullName");
// El campo de email
const emailInput = document.getElementById("email");
// El campo de contraseña
const passwordInput = document.getElementById("password");
// El div donde mostramos errores (en rojo)
const errorDisplay = document.getElementById("errorDisplay");
// El div donde mostramos el mensaje de éxito (en verde)
const successDisplay = document.getElementById("successDisplay");
// La lista <ul> donde mostramos los usuarios registrados
const usersList = document.getElementById("usersList");
// ============================================================
// 4. FUNCIÓN updateUsersUI
// Carga todos los usuarios desde MongoDB y los muestra
// en la lista de la página. Se llama al abrir la página
// y después de cada registro exitoso
// ============================================================
function updateUsersUI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Pedimos todos los usuarios a nuestra API
            // GET es el método por defecto — solo pide datos sin enviar nada
            const response = yield fetch("http://localhost:3000/api/users");
            // Convertimos la respuesta a un array de objetos User
            const users = yield response.json();
            // Limpiamos la lista antes de redibujarla
            // para evitar que se dupliquen los usuarios
            usersList.innerHTML = "";
            // Recorremos cada usuario y creamos un <li> por cada uno
            users.forEach(user => {
                const li = document.createElement("li");
                // Clase CSS para los estilos del item
                li.className = "history-item";
                // Llenamos el <li> con los datos del usuario
                li.innerHTML = `
                👤 <strong>${user.fullName}</strong> — ${user.email}
                <br>
                <small>Registered at: ${user.createdAt}</small>
            `;
                // Agregamos el <li> a la lista <ul> en el HTML
                usersList.appendChild(li);
            });
        }
        catch (error) {
            // Si el servidor no está corriendo mostramos el error
            // solo en la consola (F12) sin romper la página
            console.error("Could not load users:", error);
        }
    });
}
// ============================================================
// 5. EVENTO DEL BOTÓN REGISTER
// Todo este código se ejecuta cuando el usuario
// hace clic en "Create Account"
// "async" es necesario porque usamos "await" dentro
// ============================================================
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
    // El "?" significa "solo si el botón existe en el HTML"
    // Leemos los valores actuales de cada campo del formulario
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    // Borramos mensajes anteriores para que no se acumulen
    errorDisplay.innerHTML = "";
    successDisplay.innerHTML = "";
    // Ejecutamos la función validate con los 3 campos
    const errors = validate(fullName, email, password);
    // Si el array de errores tiene algún elemento significa
    // que hay errores — los mostramos y detenemos el registro
    if (errors.length > 0) {
        // map() convierte cada error en un párrafo HTML rojo
        // join("") une todos los párrafos en un solo texto
        errorDisplay.innerHTML = errors
            .map(e => `<p class="result-error">⚠️ ${e}</p>`)
            .join("");
        return; // "return" detiene el código aquí — no continúa
    }
    try {
        // Si la validación pasó, enviamos los datos a MongoDB
        // fetch con method POST significa que ENVIAMOS datos
        // headers dice que el formato es JSON
        // body contiene los datos convertidos a texto JSON
        const response = yield fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password })
        });
        // Convertimos la respuesta del servidor a objeto JavaScript
        const data = yield response.json();
        // response.ok es false si el servidor devolvió un error
        // Por ejemplo: email ya registrado → error 400
        if (!response.ok) {
            errorDisplay.innerHTML = `<p class="result-error">⚠️ ${data.error}</p>`;
            return; // Detenemos el código
        }
        // Si llegamos aquí el registro fue exitoso
        // Mostramos mensaje de bienvenida con el nombre del usuario
        successDisplay.innerHTML = `
            <p class="result-success">✅ Welcome ${data.user.fullName}! Redirecting to login...</p>
        `;
        // Limpiamos los campos del formulario
        fullNameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        // Actualizamos la lista de usuarios registrados
        updateUsersUI();
        // Esperamos 2 segundos y redirigimos al login
        // setTimeout(función, milisegundos) — 2000ms = 2 segundos
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
    catch (error) {
        // Si el servidor no está corriendo el fetch falla
        // Mostramos un mensaje amigable al usuario
        errorDisplay.innerHTML = `<p class="result-error">⚠️ Could not connect to server. Make sure the server is running.</p>`;
    }
}));
// ============================================================
// 6. INICIO - Se ejecuta cuando la página carga
// Carga y muestra los usuarios ya registrados en MongoDB
// ============================================================
updateUsersUI();
// ============================================================
// 7. TOGGLE PASSWORD - Muestra u oculta la contraseña
// Cuando el usuario hace clic en el ojito 👁️
// ============================================================
const togglePassword = document.getElementById("togglePassword");
// Forzamos que empiece en View por si acaso
if (togglePassword)
    togglePassword.textContent = "View";
togglePassword === null || togglePassword === void 0 ? void 0 : togglePassword.addEventListener("click", () => {
    // Leemos el tipo actual del campo contraseña
    // Si es "password" → los caracteres se ven como ****
    // Si es "text"     → los caracteres se ven normales
    const type = passwordInput.type === "password" ? "text" : "password";
    // Cambiamos el tipo del campo al opuesto
    // "password" → "text" (muestra la contraseña)
    // "text" → "password" (oculta la contraseña)
    passwordInput.type = type;
    // Cambiamos el emoji del botón según el estado
    togglePassword.textContent = type === "password" ? "View" : "Hide";
});
