"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    // Sin imports — usa funciones globales
    requireAuth(); // ← de session.ts
    const myConverter = new CurrencyConverter(); // ← de CurrencyConverter.ts
    const btn = document.getElementById("convertBtn");
    const amountInput = document.getElementById("amount");
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");
    const resultDisplay = document.getElementById("resultDisplay");
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", logout); // ← de session.ts
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const amount = parseFloat(amountInput.value);
            const from = fromSelect.value;
            const to = toSelect.value;
            const result = myConverter.convert(amount, from, to);
            resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;
            const user = getLoggedUser(); // ← de session.ts
            if (user) {
                yield saveConversion(user.fullName, from, to, amount, result); // ← de apiService.ts
            }
            yield loadHistoryFromDB(); // ← de historyUI.ts
        }
        catch (error) {
            resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
        }
    }));
    loadHistoryFromDB();
})();
