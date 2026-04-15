"use strict";
/**
 * ARCHIVO: rates.ts
 * PROPÓSITO: Muestra la tabla de tasas de cambio dinámicamente
 * y verifica que el usuario esté conectado
 */
// ============================================================
// 2. DATOS - Lista de todas las monedas disponibles
// Cada objeto sigue el molde de la interfaz CurrencyInfo
// ============================================================
const currencies = [
    { code: "USD", name: "US Dollar", rate: 1.00, flag: "🇺🇸" },
    { code: "PEN", name: "Peruvian Sol", rate: 3.90, flag: "🇵🇪" },
    { code: "EUR", name: "Euro", rate: 0.87, flag: "🇪🇺" },
    { code: "MXN", name: "Mexican Peso", rate: 17.00, flag: "🇲🇽" },
    { code: "CLP", name: "Chilean Peso", rate: 970.0, flag: "🇨🇱" },
    { code: "BRL", name: "Brazilian Real", rate: 4.98, flag: "🇧🇷" },
    { code: "GBP", name: "British Pound", rate: 0.79, flag: "🇬🇧" },
];
// ============================================================
// 3. DOM - Seleccionamos el elemento HTML donde va la tabla
// getElementById busca el elemento por su id en el HTML
// ============================================================
const ratesBody = document.getElementById("ratesBody");
// ============================================================
// 4. FUNCIÓN - Construye la tabla fila por fila
// Se llama "dinámica" porque TypeScript genera las filas,
// no están escritas a mano en el HTML
// ============================================================
function renderRatesTable() {
    // Limpiamos la tabla antes de dibujarla
    // (por si se llama más de una vez)
    ratesBody.innerHTML = "";
    // Recorremos cada moneda del array currencies
    currencies.forEach(currency => {
        // Creamos una fila <tr> nueva en HTML
        const row = document.createElement("tr");
        // Si la moneda es USD la resaltamos en verde
        // porque es la moneda base de todos los cálculos
        if (currency.code === "USD") {
            row.className = "base-currency-row";
        }
        // Llenamos la fila con los datos de la moneda
        // Cada <td> es una celda de la tabla
        row.innerHTML = `
            <td>${currency.flag} ${currency.name}</td>
            <td><strong>${currency.code}</strong></td>
            <td>${currency.rate.toFixed(2)}</td>
        `;
        // Agregamos la fila al cuerpo de la tabla en el HTML
        ratesBody.appendChild(row);
    });
}
// ============================================================
// 5. SESIÓN - Verifica que el usuario esté conectado
// Las llaves {} crean un bloque separado para evitar
// conflictos de nombres con otros archivos .ts
// ============================================================
{
    // Buscamos en localStorage si hay un usuario conectado
    // localStorage es como una memoria del navegador que
    // guarda datos aunque cambies de página
    const loggedUser = localStorage.getItem("loggedUser");
    // Si NO hay usuario conectado, mandamos al login
    if (!loggedUser) {
        window.location.href = "login.html";
    }
    // Seleccionamos el botón de logout del HTML
    const logoutBtn = document.getElementById("logoutBtn");
    // Cuando el usuario hace clic en Logout:
    // 1. Borramos el usuario de localStorage (cierra sesión)
    // 2. Mandamos al usuario de vuelta al login
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html";
    });
}
// ============================================================
// 6. INICIO - Ejecutamos la función cuando carga la página
// ============================================================
renderRatesTable();
