/**
 * ARCHIVO: converter.ts
 * PROPÓSITO: Maneja la lógica de conversión de monedas
 * y verifica que el usuario esté conectado
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
// 2. CLASE - Contiene toda la lógica de conversión
// Una clase es como una caja que agrupa datos y funciones
// relacionadas entre sí
// ============================================================
class CurrencyConverter {
    // CONSTRUCTOR - Se ejecuta automáticamente cuando
    // se crea la clase con "new CurrencyConverter()"
    constructor() {
        this.history = []; // Lista de conversiones
        this.nextId = 1; // ID que sube automáticamente
        // Todas las tasas están basadas en 1 USD
        // Ejemplo: 1 USD = 3.90 PEN
        this.rates = {
            "USD": 1.0,
            "PEN": 3.90,
            "EUR": 0.87,
            "MXN": 17.00,
            "CLP": 970.0,
            "BRL": 4.98,
            "GBP": 0.79
        };
    }
    // MÉTODO convert - Convierte una cantidad de una moneda a otra
    // "public" significa que puede llamarse desde fuera de la clase
    convert(amount, from, to) {
        // Validación 1: la cantidad debe ser un número positivo
        // isNaN significa "¿esto NO es un número?"
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }
        // Validación 2: ambas monedas deben existir en nuestra lista
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported.");
        }
        // CÁLCULO en 3 pasos:
        // Paso 1: convertimos a USD primero (moneda base)
        // Ejemplo: 100 PEN / 3.90 = 25.64 USD
        const amountInUsd = amount / this.rates[from];
        // Paso 2: convertimos de USD a la moneda destino
        // Ejemplo: 25.64 USD * 0.87 = 22.31 EUR
        const convertedAmount = amountInUsd * this.rates[to];
        // Paso 3: redondeamos a 2 decimales para que se vea limpio
        const finalResult = Number(convertedAmount.toFixed(2));
        // Guardamos la conversión en el historial
        const newRecord = {
            id: this.nextId++, // 1, 2, 3...
            timestamp: new Date().toLocaleTimeString(), // "10:35:22 AM"
            from, // "PEN"
            to, // "USD"
            amount, // 100
            result: finalResult // 25.64
        };
        // push() agrega el nuevo registro al final del array
        this.history.push(newRecord);
        return finalResult;
    }
    // MÉTODO getHistory - Devuelve todas las conversiones guardadas
    getHistory() {
        return this.history;
    }
}
// ============================================================
// 3. DOM - Conecta la clase con la interfaz HTML
// ============================================================
// Creamos UNA sola instancia de la clase
// Aquí viven todos los datos de las conversiones
const myConverter = new CurrencyConverter();
// Seleccionamos todos los elementos HTML que necesitamos
// getElementById busca el elemento por su id en el HTML
const btn = document.getElementById("convertBtn");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("resultDisplay");
const historyList = document.getElementById("historyList");
// ============================================================
// 4. FUNCIÓN - Redibuja la lista del historial en pantalla
// Se llama cada vez que se hace una nueva conversión
// ============================================================
function updateHistoryUI() {
    // Borramos la lista actual antes de redibujarla
    historyList.innerHTML = "";
    // Recorremos cada conversión guardada
    myConverter.getHistory().forEach(item => {
        // Creamos un elemento <li> nuevo
        const li = document.createElement("li");
        // Usamos una clase CSS para los estilos
        // (mejor que poner estilos directo en el TypeScript)
        li.className = "history-item";
        // Llenamos el <li> con los datos de la conversión
        li.innerHTML = `
            <strong>${item.amount} ${item.from}</strong> ➡ 
            ${item.result} ${item.to} 
            <br> 
            <small>${item.timestamp}</small>
        `;
        // Agregamos el <li> a la lista <ul> del HTML
        historyList.appendChild(li);
    });
}
// ============================================================
// 5. EVENTO - Se ejecuta cuando el usuario hace clic en Convert
// ============================================================
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
    try {
        // Leemos los valores del formulario
        const amount = parseFloat(amountInput.value); // texto → número
        const from = fromSelect.value; // "PEN"
        const to = toSelect.value; // "USD"
        // Llamamos al método convert de nuestra clase
        const result = myConverter.convert(amount, from, to);
        // Mostramos el resultado en pantalla en verde
        resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;
        // Actualizamos la lista del historial
        updateHistoryUI();
        yield fetch("http://localhost:3000/api/conversions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ from, to, amount, result })
        });
    }
    catch (error) {
        // Si algo sale mal mostramos el error en rojo
        resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
    }
}));
// ============================================================
// 6. SESIÓN - Verifica que el usuario esté conectado
// Las llaves {} evitan conflictos de nombres con otros archivos
// ============================================================
{
    // Buscamos en localStorage si hay un usuario conectado
    // localStorage guarda datos aunque cambies de página
    const loggedUser = localStorage.getItem("loggedUser");
    // Si NO hay usuario conectado mandamos al login
    if (!loggedUser) {
        window.location.href = "login.html";
    }
    // Seleccionamos el botón de logout
    const logoutBtn = document.getElementById("logoutBtn");
    // Cuando hace clic en Logout:
    // 1. Borramos el usuario de localStorage
    // 2. Mandamos al usuario al login
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html";
    });
}
// --- Function: loads conversion history from MongoDB ---
function loadHistoryFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Pedimos todas las conversiones guardadas en MongoDB
            const response = yield fetch("http://localhost:3000/api/conversions");
            const conversions = yield response.json();
            // Limpiamos la lista antes de mostrar
            historyList.innerHTML = "";
            // Dibujamos cada conversión en la lista
            conversions.forEach((item) => {
                const li = document.createElement("li");
                li.className = "history-item";
                li.innerHTML = `
                <strong>${item.amount} ${item.from}</strong> ➡ 
                ${item.result} ${item.to} 
                <br> 
                <small>${item.timestamp}</small>
            `;
                historyList.appendChild(li);
            });
        }
        catch (error) {
            console.error("Could not load history:", error);
        }
    });
}
// Cargamos el historial cuando la página abre
loadHistoryFromDB();
