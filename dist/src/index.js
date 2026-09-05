"use strict";
// Sin imports
const currencyList = document.getElementById("currencyList");
const availableCurrencies = [
    { flag: "🇺🇸", code: "USD", name: "US Dollar" },
    { flag: "🇵🇪", code: "PEN", name: "Peruvian Sol" },
    { flag: "🇪🇺", code: "EUR", name: "Euro" },
    { flag: "🇲🇽", code: "MXN", name: "Mexican Peso" },
    { flag: "🇨🇱", code: "CLP", name: "Chilean Peso" },
    { flag: "🇧🇷", code: "BRL", name: "Brazilian Real" },
    { flag: "🇬🇧", code: "GBP", name: "British Pound" },
];
function renderCurrencyList() {
    currencyList.innerHTML = "";
    availableCurrencies.forEach(currency => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `${currency.flag} <strong>${currency.code}</strong> — ${currency.name}`;
        currencyList.appendChild(li);
    });
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(() => console.log("✅ Service Worker registered!"))
            .catch(err => console.log("❌ Service Worker error:", err));
    });
}
renderCurrencyList();
