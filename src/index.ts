/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 * File: index.ts - Welcome page logic
 */

// ============================================================
// 1. DATA - Available currencies to display on welcome page
// ============================================================

// Interface that defines the structure of each currency
interface WelcomeCurrency {
    flag: string;
    code: string;
    name: string;
}

// List of all supported currencies
const availableCurrencies: WelcomeCurrency[] = [
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
const currencyList = document.getElementById("currencyList") as HTMLUListElement;

// --- Function: renders the available currencies as a dynamic list ---
function renderCurrencyList(): void {
    currencyList.innerHTML = "";

    availableCurrencies.forEach((currency: WelcomeCurrency) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `${currency.flag} <strong>${currency.code}</strong> — ${currency.name}`;
        currencyList.appendChild(li);
    });
}

// Run when the page loads
renderCurrencyList();