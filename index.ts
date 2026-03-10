/**
 * PROYECTO: Conversor de Monedas Profesional
 * Módulo: 01 - TypeScript
 * Estudiante: Katherine Gonzales
 * * Descripción: Este programa convierte divisas, mantiene un historial 
 * y utiliza tipos de datos avanzados de TypeScript.
 */

// 1. INTERFACES (El "Contrato" de datos)
// Aquí definimos qué forma deben tener nuestros objetos para que no haya errores.
interface CurrencyRates {
    [code: string]: number; // Decimos que la clave es un texto (USD) y el valor un número (3.78)
}

interface LogEntry {
    id: number;
    timestamp: string;
    from: string;
    to: string;
    amount: number;
    result: number;
}

// 2. LA CLASE (El "Cerebro" del programa)
// Usar una clase demuestra un nivel avanzado de programación.
class CurrencyConverter {
    private rates: CurrencyRates; // Almacena las tasas de cambio
    private history: LogEntry[] = []; // Un arreglo para guardar todas las conversiones
    private nextId: number = 1; // Un contador para darle un ID a cada conversión

    constructor() {
        // Definimos las tasas manuales (Base: 1 Dólar)
        this.rates = {
            "USD": 1.0,
            "PEN": 3.78, // Sol Peruano
            "EUR": 0.92, // Euro
            "MXN": 17.05, // Peso Mexicano
            "CLP": 970.0, // Peso Chileno
            "BRL": 4.98,  // Real Brasileño
            "GBP": 0.79   // Libra Esterlina
        };
    }

    /**
     * Función principal: Realiza el cálculo y guarda en el historial
     * Usa tipado fuerte (: number, : string)
     */
    public convert(amount: number, from: string, to: string): void {
        console.log(`\n> Intentando convertir: ${amount} ${from} a ${to}...`);

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
        const amountInUsd = amount / this.rates[from];
        const convertedAmount = amountInUsd * this.rates[to];
        const finalResult = Number(convertedAmount.toFixed(2));

        // GUARDAR EN EL HISTORIAL
        // Creamos un objeto que representa esta operación
        const newRecord: LogEntry = {
            id: this.nextId++,
            timestamp: new Date().toLocaleString(),
            from: from,
            to: to,
            amount: amount,
            result: finalResult
        };

        this.history.push(newRecord); // Lo metemos al arreglo
        console.log(`✅ ¡Éxito! ${amount} ${from} equivalen a ${finalResult} ${to}`);
    }

    /**
     * Función para mostrar el historial acumulado
     */
    public showFullHistory(): void {
        console.log("\n--- 📜 HISTORIAL DE CONVERSIONES DE KATHERINE ---");
        if (this.history.length === 0) {
            console.log("No se han realizado operaciones.");
        } else {
            this.history.forEach(item => {
                console.log(`ID: ${item.id} | ${item.timestamp} | ${item.amount} ${item.from} -> ${item.result} ${item.to}`);
            });
        }
        console.log("--------------------------------------------------\n");
    }

    /**
     * Función para listar las monedas que el programa entiende
     */
    public listCurrencies(): void {
        console.log("Monedas aceptadas actualmente:");
        console.log(Object.keys(this.rates).join(" - "));
    }
}

// 3. EJECUCIÓN DEL PROGRAMA
// Aquí es donde "encendemos" nuestro conversor
const myConverter = new CurrencyConverter();

console.log("=== BIENVENIDO AL CONVERSOR TS SEMANA 2 ===");
myConverter.listCurrencies();

// Realizamos varias pruebas para llenar el historial
myConverter.convert(100, "PEN", "USD");  // 100 Soles a Dólares
myConverter.convert(50, "USD", "EUR");   // 50 Dólares a Euros
myConverter.convert(1500, "MXN", "PEN"); // 1500 Pesos a Soles
myConverter.convert(-10, "USD", "PEN");  // Esto debería dar ERROR

// Mostramos todo lo que pasó
myConverter.showFullHistory();

console.log("Gracias por usar mi aplicación de TypeScript.");