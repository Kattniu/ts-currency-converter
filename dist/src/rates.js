"use strict";
/**
 * FILE: rates.ts
 * PURPOSE: Gerente de la página rates — solo une todo
 */
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("./auth/session");
// Protege la página
(0, session_1.requireAuth)();
// Elementos del DOM
const ratesBody = document.getElementById("ratesBody");
const logoutBtn = document.getElementById("logoutBtn");
// Logout
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", session_1.logout);
// Datos de monedas
const currencies = [
    { code: "USD", name: "US Dollar", rate: 1.00, flag: "🇺🇸" },
    { code: "PEN", name: "Peruvian Sol", rate: 3.90, flag: "🇵🇪" },
    { code: "EUR", name: "Euro", rate: 0.87, flag: "🇪🇺" },
    { code: "MXN", name: "Mexican Peso", rate: 17.00, flag: "🇲🇽" },
    { code: "CLP", name: "Chilean Peso", rate: 970.0, flag: "🇨🇱" },
    { code: "BRL", name: "Brazilian Real", rate: 4.98, flag: "🇧🇷" },
    { code: "GBP", name: "British Pound", rate: 0.79, flag: "🇬🇧" },
];
// Construye la tabla
function renderRatesTable() {
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
