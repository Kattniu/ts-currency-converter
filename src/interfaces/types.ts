/**
 * FILE: interfaces/types.ts
 * PURPOSE: Define todos los tipos e interfaces compartidos
 * de la aplicación
 */

// Define cómo se guardan las tasas de cambio
// Ejemplo: { "USD": 1.0, "PEN": 3.90 }
export interface CurrencyRates {
    [code: string]: number;
}

// Define cómo se ve cada conversión en el historial local
export interface LogEntry {
    id: number;
    timestamp: string;
    from: string;
    to: string;
    amount: number;
    result: number;
}

// Define cómo se ve un usuario logueado
export interface LoggedUser {
    fullName: string;
    email: string;
    _id: string;
}

// Define cómo se ve una conversión guardada en MongoDB
export interface ConversionRecord {
    user: string;
    from: string;
    to: string;
    amount: number;
    result: number;
    timestamp: string;
}

export interface CurrencyInfo {
    code: string;
    name: string;
    rate: number;
    flag: string;
}

export interface WelcomeCurrency {
    flag: string;
    code: string;
    name: string;
}