/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 * File: rates.ts - Dynamically displays exchange rate table
 */

// ============================================================
// 1. DATA - Currency rates and their full names
// ============================================================

// Interface to define the structure of each currency entry
interface CurrencyInfo {
    code: string;
    name: string;
    rate: number;
    flag: string;
}

// Array of all supported currencies with their details
const currencies: CurrencyInfo[] = [
    { code: "USD", name: "US Dollar",       rate: 1.00,   flag: "🇺🇸" },
    { code: "PEN", name: "Peruvian Sol",    rate: 3.90,   flag: "🇵🇪" },
    { code: "EUR", name: "Euro",            rate: 0.87,   flag: "🇪🇺" },
    { code: "MXN", name: "Mexican Peso",    rate: 17.00,  flag: "🇲🇽" },
    { code: "CLP", name: "Chilean Peso",    rate: 970.0,  flag: "🇨🇱" },
    { code: "BRL", name: "Brazilian Real",  rate: 4.98,   flag: "🇧🇷" },
    { code: "GBP", name: "British Pound",   rate: 0.79,   flag: "🇬🇧" },
];

// ============================================================
// 2. DOM LOGIC - Builds the table dynamically
// ============================================================

// Select the table body where rows will be inserted
const ratesBody = document.getElementById("ratesBody") as HTMLTableSectionElement;

// --- Function: generates one table row per currency ---
function renderRatesTable(): void {
    ratesBody.innerHTML = ""; // Clear before rendering

    currencies.forEach(currency => {
        // Create a new row element
        const row = document.createElement("tr");

        // Highlight the USD row as the base currency
        if (currency.code === "USD") {
            row.className = "base-currency-row";
        }

        // Build the row content with currency details
        row.innerHTML = `
            <td>${currency.flag} ${currency.name}</td>
            <td><strong>${currency.code}</strong></td>
            <td>${currency.rate.toFixed(2)}</td>
        `;

        ratesBody.appendChild(row);
    });
}

// Run the function when the page loads
renderRatesTable();