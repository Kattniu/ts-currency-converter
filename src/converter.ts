import { CurrencyConverter } from "./classes/CurrencyConverter";
import { saveConversion } from "./services/apiService";
import { getLoggedUser, requireAuth, logout } from "./auth/session";
import { loadHistoryFromDB } from "./ui/historyUI";

requireAuth();

const myConverter = new CurrencyConverter();

const btn           = document.getElementById("convertBtn")    as HTMLButtonElement;
const amountInput   = document.getElementById("amount")        as HTMLInputElement;
const fromSelect    = document.getElementById("fromCurrency")  as HTMLSelectElement;
const toSelect      = document.getElementById("toCurrency")    as HTMLSelectElement;
const resultDisplay = document.getElementById("resultDisplay") as HTMLDivElement;
const logoutBtn     = document.getElementById("logoutBtn")     as HTMLButtonElement;

logoutBtn?.addEventListener("click", logout);

btn?.addEventListener("click", async () => {
    try {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        const result = myConverter.convert(amount, from, to);
        resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;

        const user = getLoggedUser();
        if (user) {
            await saveConversion(user.fullName, from, to, amount, result);
        }

        await loadHistoryFromDB();

    } catch (error: any) {
        resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
    }
});

loadHistoryFromDB();