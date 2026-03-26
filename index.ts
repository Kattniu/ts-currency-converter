/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 */

// 1. INTERFACES (Se mantienen igual, son tus contratos de datos)
interface CurrencyRates {
    [code: string]: number;
}

interface LogEntry {
    id: number;
    timestamp: string;
    from: string;
    to: string;
    amount: number;
    result: number;
}

// 2. THE CLASS (Agregamos un método para leer el historial)
class CurrencyConverter {
    private rates: CurrencyRates;
    private history: LogEntry[] = [];
    private nextId: number = 1;

    constructor() {
        this.rates = {
            "USD": 1.0, "PEN": 3.78, "EUR": 0.92, "MXN": 17.05,
            "CLP": 970.0, "BRL": 4.98, "GBP": 0.79
        };
    }

    public convert(amount: number, from: string, to: string): number {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }

        if (!this.rates[from] || !this.rates[to]) {
            throw new Error(`Currency not supported.`);
        }

        const amountInUsd = amount / this.rates[from];
        const convertedAmount = amountInUsd * this.rates[to];
        const finalResult = Number(convertedAmount.toFixed(2));

        const newRecord: LogEntry = {
            id: this.nextId++,
            timestamp: new Date().toLocaleTimeString(), // Más corto para la web
            from, to, amount,
            result: finalResult
        };

        this.history.push(newRecord);
        return finalResult;
    }

    // NUEVO: Necesitamos este método para que la UI pueda obtener los datos
    public getHistory(): LogEntry[] {
        return this.history;
    }
}

// 3. WEB INTERFACE LOGIC (El "Puente" o DOM Manipulation)
// Aquí es donde sucede la magia del Módulo 2

const myConverter = new CurrencyConverter();

// Capturamos los elementos del HTML usando los IDs que pusimos
const btn = document.getElementById("convertBtn") as HTMLButtonElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromSelect = document.getElementById("fromCurrency") as HTMLSelectElement;
const toSelect = document.getElementById("toCurrency") as HTMLSelectElement;
const resultDisplay = document.getElementById("resultDisplay") as HTMLDivElement;
const historyList = document.getElementById("historyList") as HTMLUListElement;

// Función para actualizar la lista en la pantalla (Dynamic Lists)
function updateHistoryUI() {
    historyList.innerHTML = ""; // Limpiamos la lista antes de redibujar
    
    myConverter.getHistory().forEach(item => {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        li.style.padding = "5px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = `<strong>${item.amount} ${item.from}</strong> ➡ ${item.result} ${item.to} <br> <small>${item.timestamp}</small>`;
        historyList.appendChild(li); // Agregamos el elemento a la lista
    });
}

// Escuchamos el clic del botón (Event Handling)
btn?.addEventListener("click", () => {
    try {
        // 1. Obtenemos los valores de la web
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        // 2. Usamos tu lógica de la clase
        const result = myConverter.convert(amount, from, to);

        // 3. Mostramos el resultado en la caja de texto (DOM Manipulation)
        resultDisplay.innerHTML = `<h2 style="color: #27ae60;">${result} ${to}</h2>`;
        
        // 4. Actualizamos el historial visual
        updateHistoryUI();

    } catch (error: any) {
        // Si hay error (como un número negativo), lo mostramos en rojo
        resultDisplay.innerHTML = `<p style="color: #e74c3c;">${error.message}</p>`;
    }
});