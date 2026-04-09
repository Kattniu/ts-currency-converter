"use strict";
// ============================================================
// 1. INTERFACES - Define the shape/structure of our data
// ============================================================
// ============================================================
// 2. CLASS - Contains all the conversion business logic
// ============================================================
class CurrencyConverter {
    // --- Constructor: runs once when the object is created ---
    constructor() {
        this.history = []; // Array to store conversion history
        this.nextId = 1; // Auto-increments ID for each record
        // All rates are relative to 1 USD (US Dollar as base currency)
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
    // --- Method: converts an amount from one currency to another ---
    convert(amount, from, to) {
        // Validation: amount must be a positive number
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }
        // Validation: both currencies must exist in our rates table
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported.");
        }
        // Step 1: Convert the amount to USD first (our base currency)
        const amountInUsd = amount / this.rates[from];
        // Step 2: Convert from USD to the target currency
        const convertedAmount = amountInUsd * this.rates[to];
        // Step 3: Round to 2 decimal places for clean display
        const finalResult = Number(convertedAmount.toFixed(2));
        // Save this conversion as a new record in history
        const newRecord = {
            id: this.nextId++,
            timestamp: new Date().toLocaleTimeString(),
            from,
            to,
            amount,
            result: finalResult
        };
        this.history.push(newRecord);
        return finalResult;
    }
    // --- Method: returns the full conversion history array ---
    getHistory() {
        return this.history;
    }
}
// ============================================================
// 3. DOM LOGIC - Connects the class to the HTML interface
// ============================================================
// Create one instance of the converter (this holds our data)
const myConverter = new CurrencyConverter();
// Select all the HTML elements we need to interact with
const btn = document.getElementById("convertBtn");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("resultDisplay");
const historyList = document.getElementById("historyList");
// --- Function: rebuilds the history list in the UI ---
function updateHistoryUI() {
    historyList.innerHTML = ""; // Clear the current list before re-rendering
    myConverter.getHistory().forEach(item => {
        const li = document.createElement("li");
        // Use a CSS class instead of inline styles (cleaner separation)
        li.className = "history-item";
        // Build the list item content with the conversion details
        li.innerHTML = `
            <strong>${item.amount} ${item.from}</strong> ➡ 
            ${item.result} ${item.to} 
            <br> 
            <small>${item.timestamp}</small>
        `;
        historyList.appendChild(li);
    });
}
// --- Event Listener: fires when the Convert button is clicked ---
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
    try {
        // Read the current values from the form inputs
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;
        // Run the conversion using our class method
        const result = myConverter.convert(amount, from, to);
        // Show the result in the result box (DOM manipulation)
        resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;
        // Refresh the history list to include the new entry
        updateHistoryUI();
    }
    catch (error) {
        // If something went wrong, display the error message in red
        resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
    }
});
