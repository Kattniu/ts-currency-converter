// Sin imports — independiente
class CurrencyConverter {
    private rates: { [code: string]: number };
    private history: any[] = [];
    private nextId: number = 1;

    constructor() {
        this.rates = {
            "USD": 1.0,
            "PEN": 3.90,
            "EUR": 0.87,
            "MXN": 17.00,
            "CLP": 970.0,
            "BRL": 4.98,
            "GBP": 0.79
        };
    }

    public convert(amount: number, from: string, to: string): number {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported.");
        }

        const amountInUsd = amount / this.rates[from];
        const convertedAmount = amountInUsd * this.rates[to];
        const finalResult = Number(convertedAmount.toFixed(2));

        this.history.push({
            id: this.nextId++,
            timestamp: new Date().toLocaleTimeString(),
            from, to, amount,
            result: finalResult
        });

        return finalResult;
    }

    public getHistory(): any[] {
        return this.history;
    }
}