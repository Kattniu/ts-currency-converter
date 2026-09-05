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
Object.defineProperty(exports, "__esModule", { value: true });
// converter.ts (30 líneas) ← muy pequeño ahora
const currencyConverter_1 = require("./classes/currencyConverter");
const apiService_1 = require("./services/apiService");
const session_1 = require("./auth/session");
const historyUI_1 = require("./ui/historyUI");
(0, session_1.requireAuth)();
const myConverter = new currencyConverter_1.CurrencyConverter();
const btn = document.getElementById("convertBtn");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("resultDisplay");
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", session_1.logout);
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;
        const result = myConverter.convert(amount, from, to);
        resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;
        const user = (0, session_1.getLoggedUser)();
        if (user) {
            yield (0, apiService_1.saveConversion)(user.fullName, from, to, amount, result);
        }
        yield (0, historyUI_1.loadHistoryFromDB)();
    }
    catch (error) {
        resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
    }
}));
(0, historyUI_1.loadHistoryFromDB)();
