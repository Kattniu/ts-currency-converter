/**
 * FILE: index.ts
 * PURPOSE: Gerente de la página principal — solo une todo
 */

import { WelcomeCurrency } from "./interfaces/types";

// Elementos del DOM
const currencyList = document.getElementById("currencyList") as HTMLUListElement;

// Datos de monedas para la página de bienvenida
const availableCurrencies: WelcomeCurrency[] = [
    { flag: "🇺🇸", code: "USD", name: "US Dollar" },
    { flag: "🇵🇪", code: "PEN", name: "Peruvian Sol" },
    { flag: "🇪🇺", code: "EUR", name: "Euro" },
    { flag: "🇲🇽", code: "MXN", name: "Mexican Peso" },
    { flag: "🇨🇱", code: "CLP", name: "Chilean Peso" },
    { flag: "🇧🇷", code: "BRL", name: "Brazilian Real" },
    { flag: "🇬🇧", code: "GBP", name: "British Pound" },
];

// Construye la lista de monedas
function renderCurrencyList(): void {
    currencyList.innerHTML = "";
    availableCurrencies.forEach((currency: WelcomeCurrency) => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `${currency.flag} <strong>${currency.code}</strong> — ${currency.name}`;
        currencyList.appendChild(li);
    });
}

// Service Worker para PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("✅ Service Worker registered!"))
            .catch(err => console.log("❌ Service Worker error:", err));
    });
}

renderCurrencyList();