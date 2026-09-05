(function() {
    // Sin imports — usa funciones globales
    requireAuth(); // ← de session.ts

    const myConverter = new CurrencyConverter(); // ← de CurrencyConverter.ts

    const btn           = document.getElementById("convertBtn")    as HTMLButtonElement;
    const amountInput   = document.getElementById("amount")        as HTMLInputElement;
    const fromSelect    = document.getElementById("fromCurrency")  as HTMLSelectElement;
    const toSelect      = document.getElementById("toCurrency")    as HTMLSelectElement;
    const resultDisplay = document.getElementById("resultDisplay") as HTMLDivElement;
    const logoutBtn     = document.getElementById("logoutBtn")     as HTMLButtonElement;

    logoutBtn?.addEventListener("click", logout); // ← de session.ts

    btn?.addEventListener("click", async () => {
        try {
            const amount = parseFloat(amountInput.value);
            const from = fromSelect.value;
            const to = toSelect.value;

            const result = myConverter.convert(amount, from, to);
            resultDisplay.innerHTML = `<h2 class="result-success">${result} ${to}</h2>`;

            const user = getLoggedUser(); // ← de session.ts
            if (user) {
                await saveConversion(user.fullName, from, to, amount, result); // ← de apiService.ts
            }

            await loadHistoryFromDB(); // ← de historyUI.ts

        } catch (error: any) {
            resultDisplay.innerHTML = `<p class="result-error">${error.message}</p>`;
        }
    });

    loadHistoryFromDB();
})();