// Sin imports — usa funciones globales de otros scripts
async function loadHistoryFromDB(): Promise<void> {
    try {
        const user = getLoggedUser(); // ← viene de session.ts
        if (!user) return;

        const conversions = await fetchUserConversions(user.fullName); // ← viene de apiService.ts
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