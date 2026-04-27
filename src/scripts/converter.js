/**
 * ARCHIVO: converter.ts
 * PROPÓSITO: Maneja la lógica de conversión de monedas,
 * guarda el historial en MongoDB y verifica la sesión del usuario
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
// 2. CLASE CurrencyConverter
// Una clase es como una caja que agrupa:
// - datos (atributos)
// - acciones (métodos)
// Todo lo relacionado con convertir monedas vive aquí
// ============================================================
class CurrencyConverter {
    // --- CONSTRUCTOR ---
    // Se ejecuta automáticamente UNA SOLA VEZ cuando escribimos:
    // const myConverter = new CurrencyConverter();
    constructor() {
        // Array vacío donde se guardarán todas las conversiones
        // LogEntry[] significa "una lista de objetos tipo LogEntry"
        this.history = [];
        // Número que empieza en 1 y sube cada vez que se hace una conversión
        // Sirve para darle un ID único a cada conversión
        this.nextId = 1;
        // Cargamos todas las tasas de cambio basadas en 1 USD
        // Significa: 1 USD = 3.90 PEN, 1 USD = 0.87 EUR, etc.
        this.rates = {
            "USD": 1.0, // Base: 1 dólar = 1 dólar
            "PEN": 3.90, // 1 dólar = 3.90 soles peruanos
            "EUR": 0.87, // 1 dólar = 0.87 euros
            "MXN": 17.00, // 1 dólar = 17 pesos mexicanos
            "CLP": 970.0, // 1 dólar = 970 pesos chilenos
            "BRL": 4.98, // 1 dólar = 4.98 reales brasileños
            "GBP": 0.79 // 1 dólar = 0.79 libras británicas
        };
    }
    // --- MÉTODO convert ---
    // "public" significa que puede llamarse desde FUERA de la clase
    // Recibe: cantidad, moneda origen, moneda destino
    // Devuelve: el resultado de la conversión como número
    convert(amount, from, to) {
        // VALIDACIÓN 1: verificamos que la cantidad sea un número positivo
        // isNaN(amount) → true si NO es un número (ejemplo: escribió letras)
        // amount <= 0   → true si es cero o negativo
        if (isNaN(amount) || amount <= 0) {
            // throw lanza un error que detiene el código
            // el catch del evento lo captura y muestra el mensaje
            throw new Error("Please enter a valid positive amount.");
        }
        // VALIDACIÓN 2: verificamos que ambas monedas existan en our rates
        // !this.rates[from] → true si la moneda origen NO existe
        // !this.rates[to]   → true si la moneda destino NO existe
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported.");
        }
        // CÁLCULO - Usamos USD como moneda intermedia:
        // Paso 1: convertimos la cantidad a USD primero
        // Ejemplo: 100 PEN ÷ 3.90 = 25.64 USD
        const amountInUsd = amount / this.rates[from];
        // Paso 2: convertimos de USD a la moneda destino
        // Ejemplo: 25.64 USD × 0.87 = 22.31 EUR
        const convertedAmount = amountInUsd * this.rates[to];
        // Paso 3: redondeamos a 2 decimales
        // toFixed(2) convierte a string "25.64"
        // Number() lo convierte de vuelta a número 25.64
        const finalResult = Number(convertedAmount.toFixed(2));
        // Creamos un objeto nuevo con todos los datos de esta conversión
        // Sigue el molde de la interfaz LogEntry
        const newRecord = {
            id: this.nextId++, // usa el ID actual y luego lo sube: 1→2→3
            timestamp: new Date().toLocaleTimeString(), // hora actual del sistema
            from, // equivale a escribir from: from
            to, // equivale a escribir to: to
            amount, // equivale a escribir amount: amount
            result: finalResult
        };
        // push() agrega el nuevo objeto AL FINAL del array history
        this.history.push(newRecord);
        // Devolvemos el resultado para mostrarlo en pantalla
        return finalResult;
    }
    // --- MÉTODO getHistory ---
    // Devuelve el array completo con todas las conversiones guardadas
    // Lo usamos para dibujar la lista del historial en el HTML
    getHistory() {
        return this.history;
    }
}
// ============================================================
// 3. DOM - Conectamos la clase con los elementos HTML
// ============================================================
// Creamos UNA instancia de la clase
// Esto es como "encender la máquina" — a partir de aquí
// podemos usar myConverter.convert() y myConverter.getHistory()
const myConverter = new CurrencyConverter();
// Seleccionamos cada elemento HTML por su id
// "as HTMLButtonElement" le dice a TypeScript exactamente
// qué tipo de elemento es para evitar errores de tipo
// El botón "Convert Now"
const btn = document.getElementById("convertBtn");
// El campo donde el usuario escribe la cantidad
const amountInput = document.getElementById("amount");
// El selector de moneda origen (From)
const fromSelect = document.getElementById("fromCurrency");
// El selector de moneda destino (To)
const toSelect = document.getElementById("toCurrency");
// El div donde mostramos el resultado de la conversión
const resultDisplay = document.getElementById("resultDisplay");
// La lista <ul> donde mostramos el historial
const historyList = document.getElementById("historyList");
// ============================================================
// 4. FUNCIÓN updateHistoryUI
// Redibuja la lista del historial usando los datos en MEMORIA
// Se llama inmediatamente después de cada conversión
// ============================================================
function updateHistoryUI() {
    // Borramos todo el contenido actual de la lista
    // para evitar que se dupliquen los elementos
    historyList.innerHTML = "";
    // forEach recorre CADA elemento del array history
    myConverter.getHistory().forEach(item => {
        // Creamos un nuevo elemento <li> en HTML
        const li = document.createElement("li");
        // Le asignamos la clase CSS "history-item" para los estilos
        // Es mejor que poner estilos directamente en TypeScript
        li.className = "history-item";
        // Llenamos el <li> con los datos de la conversión
        // Las comillas invertidas `` permiten insertar variables con ${}
        li.innerHTML = `
            <strong>${item.amount} ${item.from}</strong> ➡ 
            ${item.result} ${item.to} 
            <br> 
            <small>${item.timestamp}</small>
        `;
        // Agregamos el <li> dentro del <ul> historyList en el HTML
        historyList.appendChild(li);
    });
}
// ============================================================
// 5. EVENTO DEL BOTÓN CONVERT
// Todo este código se ejecuta cuando el usuario
// hace clic en el botón "Convert Now"
// "async" es necesario porque usamos "await" dentro
// ============================================================
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
    // El "?" significa "solo si el botón existe en el HTML"
    // Evita errores si por alguna razón el botón no se encuentra
    try {
        // Leemos el valor del campo de cantidad y lo convertimos a número
        // parseFloat convierte "100.50" (texto) → 100.50 (número)
        const amount = parseFloat(amountInput.value);
        // Leemos la moneda seleccionada en el selector "From"
        const from = fromSelect.value; // ejemplo: "PEN"
        // Leemos la moneda seleccionada en el selector "To"
        const to = toSelect.value; // ejemplo: "USD"
        // Llamamos al método convert de nuestra clase
        // Si algo sale mal lanza un error que va al catch
        const result = myConverter.convert(amount, from, to);
        // Mostramos el resultado en el div resultDisplay
        // con color verde usando la clase CSS "result-success"
        resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;
        // Actualizamos la lista del historial en pantalla
        // usando los datos guardados en MEMORIA (el array history)
        updateHistoryUI();
        // Guardamos la conversión en MongoDB via nuestra API
        // "await" espera que el fetch termine antes de continuar
        // method POST significa que estamos ENVIANDO datos
        // body contiene los datos convertidos a formato JSON
        yield fetch("http://localhost:3000/api/conversions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ from, to, amount, result })
        });
    }
    catch (error) {
        // Si convert() lanzó un error o el fetch falló
        // mostramos el mensaje de error en rojo
        resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
    }
}));
// ============================================================
// 6. SESIÓN - Protege la página
// Verifica que el usuario esté conectado antes de mostrar
// el contenido. Si no hay sesión, manda al login.
// Las llaves {} crean un bloque separado para evitar
// conflictos de nombres de variables con otros archivos .ts
// ============================================================
{
    // Buscamos en localStorage si hay un usuario guardado
    // localStorage es como una memoria del navegador que
    // persiste aunque cambies de página
    // Devuelve null si no hay nada guardado
    const loggedUser = localStorage.getItem("loggedUser");
    // Si loggedUser es null significa que NO hay sesión activa
    // Redirigimos al login inmediatamente
    if (!loggedUser) {
        window.location.href = "login.html";
    }
    // Seleccionamos el botón de logout del HTML
    const logoutBtn = document.getElementById("logoutBtn");
    // Cuando el usuario hace clic en Logout ejecutamos:
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
        // 1. Borramos el usuario de localStorage (cierra la sesión)
        localStorage.removeItem("loggedUser");
        // 2. Redirigimos al login
        window.location.href = "login.html";
    });
}
// ============================================================
// 7. FUNCIÓN loadHistoryFromDB
// Carga el historial de conversiones desde MongoDB
// Se llama cuando la página abre para mostrar conversiones
// anteriores aunque el usuario haya cambiado de página
// ============================================================
function loadHistoryFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Pedimos TODAS las conversiones guardadas en MongoDB
            // GET es el método por defecto de fetch — solo pide datos
            const response = yield fetch("http://localhost:3000/api/conversions");
            // Convertimos la respuesta a formato JSON (array de objetos)
            const conversions = yield response.json();
            // Limpiamos la lista antes de mostrar los datos
            historyList.innerHTML = "";
            // Recorremos cada conversión y creamos un <li> por cada una
            conversions.forEach((item) => {
                // "any" significa que TypeScript no verifica el tipo
                // porque los datos vienen de MongoDB con formato desconocido
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
            // Si el servidor no está corriendo o hay un error de red
            // mostramos el error en la consola (F12) sin romper la app
            console.error("Could not load history:", error);
        }
    });
}
// Llamamos la función inmediatamente cuando la página carga
// Así el historial aparece automáticamente al abrir converter.html
loadHistoryFromDB();
