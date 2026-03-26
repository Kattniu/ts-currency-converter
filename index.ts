/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 */

// 1. INTERFACES (Data Contracts)
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

// 2. THE CLASS (Core Logic)
class CurrencyConverter {
    private rates: CurrencyRates;
    private history: LogEntry[] = [];
    private nextId: number = 1;

    constructor() {
        // Exchange rates based on 1 USD
        this.rates = {
            "USD": 1.0, "PEN": 3.78, "EUR": 0.92, "MXN": 17.05,
            "CLP": 970.0, "BRL": 4.98, "GBP": 0.79
        };
    }

    public convert(amount: number, from: string, to: string): number {
        // Validation: No negative numbers or empty inputs
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }

        if (!this.rates[from] || !this.rates[to]) {
            throw new Error(`Currency not supported.`);
        }

        // Calculation
        const amountInUsd = amount / this.rates[from];
        const convertedAmount = amountInUsd * this.rates[to];
        const finalResult = Number(convertedAmount.toFixed(2));

        // Save to History
        const newRecord: LogEntry = {
            id: this.nextId++,
            timestamp: new Date().toLocaleTimeString(),
            from, to, amount,
            result: finalResult
        };

        this.history.push(newRecord);
        return finalResult;
    }

    public getHistory(): LogEntry[] {
        return this.history;
    }
}

// 3. WEB INTERFACE LOGIC (The Bridge / DOM Manipulation)
const myConverter = new CurrencyConverter();

// Select HTML elements
const btn = document.getElementById("convertBtn") as HTMLButtonElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromSelect = document.getElementById("fromCurrency") as HTMLSelectElement;
const toSelect = document.getElementById("toCurrency") as HTMLSelectElement;
const resultDisplay = document.getElementById("resultDisplay") as HTMLDivElement;
const historyList = document.getElementById("historyList") as HTMLUListElement;

// Function to update the UI list (Dynamic Lists requirement)
function updateHistoryUI() {
    historyList.innerHTML = ""; // Clear list
    
    myConverter.getHistory().forEach(item => {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = `<strong>${item.amount} ${item.from}</strong> ➡ ${item.result} ${item.to} <br> <small>${item.timestamp}</small>`;
        historyList.appendChild(li);
    });
}

// Button Click Listener (Event Handling requirement)
btn?.addEventListener("click", () => {
    try {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        // Perform conversion
        const result = myConverter.convert(amount, from, to);

        // Display result (DOM Manipulation)
        resultDisplay.innerHTML = `<h2 style="color: #27ae60;">${result} ${to}</h2>`;
        
        // Update history
        updateHistoryUI();

    } catch (error: any) {
        // Error handling visible on the web
        resultDisplay.innerHTML = `<p style="color: #e74c3c;">${error.message}</p>`;
    }
});