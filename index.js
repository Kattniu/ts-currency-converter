/**
 * PROJECT: Professional Currency Converter - BYU-Idaho
 * Module: 01 - TypeScript
 * Student: Katherine Gonzales
 * Description: Currency conversion system featuring transaction history,
 * error handling (exceptions), recursion, and asynchronous programming.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    /**
     * REQUIREMENT: Exception Handling (throw)
     * Performs the conversion and validates input.
     */
    CurrencyConverter.prototype.convert = function (amount, from, to) {
        if (amount <= 0) {
            throw new Error("Amount must be a positive number.");
        }
        if (!this.rates[from] || !this.rates[to]) {
            throw new Error("Currency not supported. Valid keys: ".concat(Object.keys(this.rates).join(", ")));
        }
        // Mathematical Logic
        var amountInUsd = amount / this.rates[from];
        var convertedAmount = amountInUsd * this.rates[to];
        var finalResult = Number(convertedAmount.toFixed(2));
        // Save to History (List requirement)
        var newRecord = {
            id: this.nextId++,
            timestamp: new Date().toLocaleString(),
            from: from,
            to: to,
            amount: amount,
            result: finalResult
        };
        this.history.push(newRecord);
        return finalResult;
    };
    /**
     * Requirement: Lists
     * Displays all stored transactions using .forEach
     */
    CurrencyConverter.prototype.showFullHistory = function () {
        console.log("\n--- 📜 TRANSACTION HISTORY (KATHERINE GONZALES) ---");
        if (this.history.length === 0) {
            console.log("No transactions found.");
        }
        else {
            this.history.forEach(function (item) {
                console.log("ID: ".concat(item.id, " | ").concat(item.timestamp, " | ").concat(item.amount, " ").concat(item.from, " -> ").concat(item.result, " ").concat(item.to));
            });
        }
    };
    return CurrencyConverter;
}());
// 3. ADDITIONAL FEATURES
/**
 * REQUIREMENT: Asynchronous Function (Async/Await)
 * Simulates a delay while fetching external exchange rates
 */
function loadSystemData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Fetching latest exchange rates from server...");
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
        });
    });
}
/**
 * REQUIREMENT: RECURSION
 * Processes an array of conversion requests by calling itself
 */
function processRecursive(list, index, converter) {
    // Base Case
    if (index >= list.length) {
        console.log("\n>>> Batch processing finished.");
        return;
    }
    var item = list[index];
    try {
        var res = converter.convert(item.amount, item.from, item.to);
        console.log("[SUCCESS] ".concat(item.amount, " ").concat(item.from, " = ").concat(res, " ").concat(item.to));
    }
    catch (e) {
        // Exception Handling: Catching the error so the recursion doesn't stop
        console.log("[ERROR] At index ".concat(index, ": ").concat(e.message));
    }
    // Recursive Call
    processRecursive(list, index + 1, converter);
}
// 4. MAIN PROGRAM EXECUTION
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var myConverter, batchOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myConverter = new CurrencyConverter();
                    // Asynchronous call demonstration
                    return [4 /*yield*/, loadSystemData()];
                case 1:
                    // Asynchronous call demonstration
                    _a.sent();
                    console.log("\n=== WELCOME TO KATHERINE'S TS CONVERTER ===");
                    batchOrders = [
                        { amount: 100, from: "PEN", to: "USD" },
                        { amount: 50, from: "USD", to: "EUR" },
                        { amount: -20, from: "USD", to: "PEN" }, // This will trigger an Exception
                        { amount: 1500, from: "MXN", to: "PEN" }
                    ];
                    // Start Recursion
                    processRecursive(batchOrders, 0, myConverter);
                    // Show final history
                    myConverter.showFullHistory();
                    console.log("\nThank you for using my TypeScript application.");
                    return [2 /*return*/];
            }
        });
    });
}
// Run the application
main();
