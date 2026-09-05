/**
 * FILE: ui/historyUI.ts
 * PURPOSE: Actualización del DOM para el historial
 */

import { fetchUserConversions } from "../services/apiService";
import { getLoggedUser } from "../auth/session";

export async function loadHistoryFromDB(): Promise<void> {
    try {
        const user = getLoggedUser();
        if (!user) return;

        const conversions = await fetchUserConversions(user.fullName);
        const historyList = document.getElementById("historyList") as HTMLUListElement;
        historyList.innerHTML = "";

        conversions.forEach((item: any) => {
            const li = document.createElement("li");
            li.className = "history-item";
            li.innerHTML = `
                <strong>${item.amount} ${item.from}</strong> ➡ 
                ${item.result} ${item.to} 
                <br> 
                <small>${item.timestamp || "Just now"}</small>
            `;
            historyList.appendChild(li);
        });

    } catch (error) {
        console.error("Could not load history:", error);
    }
}