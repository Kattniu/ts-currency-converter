/**
 * PROJECT: Professional Currency Converter Web App - BYU-Idaho
 * Module: 02 - Web Apps
 * Student: Katherine Gonzales
 */
// 2. THE CLASS (Core Logic)
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter() {
        this.history = [];
        this.nextId = 1;
        // Exchange rates based on 1 USD
        this.rates = {
            "USD": 1.0, "PEN": 3.78, "EUR": 0.92, "MXN": 17.05,
            "CLP": 970.0, "BRL": 4.98, "GBP": 0.79
        };
    }
    CurrencyConverter.prototype.convert = function (amount, from, to) {
        // Validation: No negative numbers or empty inputs
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Please enter a valid positive amount.");
        }
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported.");
        }
        // Calculation
        var amountInUsd = amount / this.rates[from];
        var convertedAmount = amountInUsd * this.rates[to];
        var finalResult = Number(convertedAmount.toFixed(2));
        // Save to History
        var newRecord = {
            id: this.nextId++,
            timestamp: new Date().toLocaleTimeString(),
            from: from,
            to: to,
            amount: amount,
            result: finalResult
        };
        this.history.push(newRecord);
        return finalResult;
    };
    CurrencyConverter.prototype.getHistory = function () {
        return this.history;
    };
    return CurrencyConverter;
}());
// 3. WEB INTERFACE LOGIC (The Bridge / DOM Manipulation)
var myConverter = new CurrencyConverter();
// Select HTML elements
var btn = document.getElementById("convertBtn");
var amountInput = document.getElementById("amount");
var fromSelect = document.getElementById("fromCurrency");
var toSelect = document.getElementById("toCurrency");
var resultDisplay = document.getElementById("resultDisplay");
var historyList = document.getElementById("historyList");
// Function to update the UI list (Dynamic Lists requirement)
function updateHistoryUI() {
    historyList.innerHTML = ""; // Clear list
    myConverter.getHistory().forEach(function (item) {
        var li = document.createElement("li");
        li.style.listStyle = "none";
        li.style.padding = "10px";
        li.style.borderBottom = "1px solid #eee";
        li.innerHTML = "<strong>".concat(item.amount, " ").concat(item.from, "</strong> \u27A1 ").concat(item.result, " ").concat(item.to, " <br> <small>").concat(item.timestamp, "</small>");
        historyList.appendChild(li);
    });
}
// Button Click Listener (Event Handling requirement)
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    try {
        var amount = parseFloat(amountInput.value);
        var from = fromSelect.value;
        var to = toSelect.value;
        // Perform conversion
        var result = myConverter.convert(amount, from, to);
        // Display result (DOM Manipulation)
        resultDisplay.innerHTML = "<h2 style=\"color: #27ae60;\">".concat(result, " ").concat(to, "</h2>");
        // Update history
        updateHistoryUI();
    }
    catch (error) {
        // Error handling visible on the web
        resultDisplay.innerHTML = "<p style=\"color: #e74c3c;\">".concat(error.message, "</p>");
    }
});
