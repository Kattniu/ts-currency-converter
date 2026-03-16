/**
 * PROJECT: Professional Currency Converter - BYU-Idaho
 * Module: 01 - TypeScript
 * Student: Katherine Gonzales
 * Description: Currency conversion system featuring transaction history, 
 * error handling (exceptions), recursion, and asynchronous programming.
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

    /**
     * REQUIREMENT: Exception Handling (throw)
     * Performs the conversion and validates input.
     */
    public convert(amount: number, from: string, to: string): number {
        if (amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }

        if (!this.rates[from] || !this.rates[to]) {
            throw new Error(`Currency not supported. Valid keys: ${Object.keys(this.rates).join(", ")}`);
        }

        // Mathematical Logic
        const amountInUsd = amount / this.rates[from];
        const convertedAmount = amountInUsd * this.rates[to];
        const finalResult = Number(convertedAmount.toFixed(2));

        // Save to History (List requirement)
        const newRecord: LogEntry = {
            id: this.nextId++,
            timestamp: new Date().toLocaleString(),
            from, to, amount,
            result: finalResult
        };

        this.history.push(newRecord);
        return finalResult;
    }

    /**
     * Requirement: Lists
     * Displays all stored transactions using .forEach
     */
    public showFullHistory(): void {
        console.log("\n--- 📜 TRANSACTION HISTORY (KATHERINE GONZALES) ---");
        if (this.history.length === 0) {
            console.log("No transactions found.");
        } else {
            this.history.forEach(item => {
                console.log(`ID: ${item.id} | ${item.timestamp} | ${item.amount} ${item.from} -> ${item.result} ${item.to}`);
            });
        }
    }
}

// 3. ADDITIONAL FEATURES

/**
 * REQUIREMENT: Asynchronous Function (Async/Await)
 * Simulates a delay while fetching external exchange rates
 */
async function loadSystemData(): Promise<void> {
    console.log("Fetching latest exchange rates from server...");
    return new Promise(resolve => setTimeout(resolve, 1500));
}

/**
 * REQUIREMENT: RECURSION
 * Processes an array of conversion requests by calling itself
 */
function processRecursive(list: any[], index: number, converter: CurrencyConverter): void {
    // Base Case
    if (index >= list.length) {
        console.log("\n>>> Batch processing finished.");
        return;
    }

    const item = list[index];
    try {
        const res = converter.convert(item.amount, item.from, item.to);
        console.log(`[SUCCESS] ${item.amount} ${item.from} = ${res} ${item.to}`);
    } catch (e: any) {
        // Exception Handling: Catching the error so the recursion doesn't stop
        console.log(`[ERROR] At index ${index}: ${e.message}`);
    }

    // Recursive Call
    processRecursive(list, index + 1, converter);
}

// 4. MAIN PROGRAM EXECUTION
async function main() {
    const myConverter = new CurrencyConverter();
    
    // Asynchronous call demonstration
    await loadSystemData();

    console.log("\n=== WELCOME TO KATHERINE'S TS CONVERTER ===");

    // Batch conversion data for recursion demonstration
    const batchOrders = [
        { amount: 100, from: "PEN", to: "USD" },
        { amount: 50, from: "USD", to: "EUR" },
        { amount: -20, from: "USD", to: "PEN" }, // This will trigger an Exception
        { amount: 1500, from: "MXN", to: "PEN" }
    ];

    // Start Recursion
    processRecursive(batchOrders, 0, myConverter);

    // Show final history
    myConverter.showFullHistory();
    console.log("\nThank you for using my TypeScript application.");
}

// Run the application
main();