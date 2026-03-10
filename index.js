/**
 * PROYECTO: Conversor de Monedas Profesional
 * Módulo: 01 - TypeScript
 * Estudiante: Katherine Gonzales
 * * Descripción: Este programa convierte divisas, mantiene un historial
 * y utiliza tipos de datos avanzados de TypeScript.
 */
// 2. LA CLASE (El "Cerebro" del programa)
// Usar una clase demuestra un nivel avanzado de programación.
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
        this.history = []; // Un arreglo para guardar todas las conversiones
        this.nextId = 1; // Un contador para darle un ID a cada conversión
        // Definimos las tasas manuales (Base: 1 Dólar)
        this.rates = {
            "USD": 1.0,
            "PEN": 3.78, // Sol Peruano
            "EUR": 0.92, // Euro
            "MXN": 17.05, // Peso Mexicano
            "CLP": 970.0, // Peso Chileno
            "BRL": 4.98, // Real Brasileño
            "GBP": 0.79 // Libra Esterlina
        };
    }
    /**
     * Función principal: Realiza el cálculo y guarda en el historial
     * Usa tipado fuerte (: number, : string)
     */
    CurrencyConverter.prototype.convert = function (amount, from, to) {
        console.log("\n> Intentando convertir: ".concat(amount, " ").concat(from, " a ").concat(to, "..."));
        // VALIDACIÓN: Si el usuario pone un número negativo
        if (amount <= 0) {
            console.error("❌ Error: La cantidad debe ser un número positivo.");
            return;
        }
        // VALIDACIÓN: Si la moneda no existe en nuestra lista
        if (!this.rates[from] || !this.rates[to]) {
            console.error("❌ Error: Una de las monedas ingresadas no es válida.");
            return;
        }
        // LÓGICA MATEMÁTICA
        // Primero convertimos a Dólares (nuestra base) y luego a la moneda destino
        var amountInUsd = amount / this.rates[from];
        var convertedAmount = amountInUsd * this.rates[to];
        var finalResult = Number(convertedAmount.toFixed(2));
        // GUARDAR EN EL HISTORIAL
        // Creamos un objeto que representa esta operación
        var newRecord = {
            id: this.nextId++,
            timestamp: new Date().toLocaleString(),
            from: from,
            to: to,
            amount: amount,
            result: finalResult
        };
        this.history.push(newRecord); // Lo metemos al arreglo
        console.log("\u2705 \u00A1\u00C9xito! ".concat(amount, " ").concat(from, " equivalen a ").concat(finalResult, " ").concat(to));
    };
    /**
     * Función para mostrar el historial acumulado
     */
    CurrencyConverter.prototype.showFullHistory = function () {
        console.log("\n--- 📜 HISTORIAL DE CONVERSIONES DE KATHERINE ---");
        if (this.history.length === 0) {
            console.log("No se han realizado operaciones.");
        }
        else {
            this.history.forEach(function (item) {
                console.log("ID: ".concat(item.id, " | ").concat(item.timestamp, " | ").concat(item.amount, " ").concat(item.from, " -> ").concat(item.result, " ").concat(item.to));
            });
        }
        console.log("--------------------------------------------------\n");
    };
    /**
     * Función para listar las monedas que el programa entiende
     */
    CurrencyConverter.prototype.listCurrencies = function () {
        console.log("Monedas aceptadas actualmente:");
        console.log(Object.keys(this.rates).join(" - "));
    };
    return CurrencyConverter;
}());
// 3. EJECUCIÓN DEL PROGRAMA
// Aquí es donde "encendemos" nuestro conversor
var myConverter = new CurrencyConverter();
console.log("=== BIENVENIDO AL CONVERSOR TS SEMANA 2 ===");
myConverter.listCurrencies();
// Realizamos varias pruebas para llenar el historial
myConverter.convert(100, "PEN", "USD"); // 100 Soles a Dólares
myConverter.convert(50, "USD", "EUR"); // 50 Dólares a Euros
myConverter.convert(1500, "MXN", "PEN"); // 1500 Pesos a Soles
myConverter.convert(-10, "USD", "PEN"); // Esto debería dar ERROR
// Mostramos todo lo que pasó
myConverter.showFullHistory();
console.log("Gracias por usar mi aplicación de TypeScript.");
