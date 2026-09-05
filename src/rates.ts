/**
 * FILE: rates.ts
 * PURPOSE: Gerente de la página rates — solo une todo
 */

import { requireAuth, logout } from "./auth/session";
import { CurrencyInfo } from "./interfaces/types";

// Protege la página
requireAuth();

// Elementos del DOM
const ratesBody = document.getElementById("ratesBody") as HTMLTableSectionElement;
const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

// Logout
logoutBtn?.addEventListener("click", logout);

// Datos de monedas
const currencies: CurrencyInfo[] = [
    { code: "USD", name: "US Dollar",      rate: 1.00,  flag: "🇺🇸" },
    { code: "PEN", name: "Peruvian Sol",   rate: 3.90,  flag: "🇵🇪" },
    { code: "EUR", name: "Euro",           rate: 0.87,  flag: "🇪🇺" },
    { code: "MXN", name: "Mexican Peso",   rate: 17.00, flag: "🇲🇽" },
    { code: "CLP", name: "Chilean Peso",   rate: 970.0, flag: "🇨🇱" },
    { code: "BRL", name: "Brazilian Real", rate: 4.98,  flag: "🇧🇷" },
    { code: "GBP", name: "British Pound",  rate: 0.79,  flag: "🇬🇧" },
];

// Construye la tabla
function renderRatesTable(): void {
    ratesBody.innerHTML = "";
    currencies.forEach(currency => {
        const row = document.createElement("tr");
        if (currency.code === "USD") {
            row.className = "base-currency-row";
        }
        row.innerHTML = `
            <td>${currency.flag} ${currency.name}</td>
            <td><strong>${currency.code}</strong></td>
            <td>${currency.rate.toFixed(2)}</td>
        `;
        ratesBody.appendChild(row);
    });
}

renderRatesTable();