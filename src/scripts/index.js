"use strict";
/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 * File: index.ts - Welcome page logic
 */
// List of all supported currencies
const availableCurrencies = [
    { flag: "🇺🇸", code: "USD", name: "US Dollar" },
    { flag: "🇵🇪", code: "PEN", name: "Peruvian Sol" },
    { flag: "🇪🇺", code: "EUR", name: "Euro" },
    { flag: "🇲🇽", code: "MXN", name: "Mexican Peso" },
    { flag: "🇨🇱", code: "CLP", name: "Chilean Peso" },
    { flag: "🇧🇷", code: "BRL", name: "Brazilian Real" },
    { flag: "🇬🇧", code: "GBP", name: "British Pound" },
];
// ============================================================
// 2. DOM LOGIC - Builds the currency list dynamically
// ============================================================
// Select the list element from HTML
const currencyList = document.getElementById("currencyList");
// --- Function: renders the available currencies as a dynamic list ---
function renderCurrencyList() {
    currencyList.innerHTML = "";
    availableCurrencies.forEach((currency) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `${currency.flag} <strong>${currency.code}</strong> — ${currency.name}`;
        currencyList.appendChild(li);
    });
}
// Run when the page loads
renderCurrencyList();
