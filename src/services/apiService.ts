// Sin imports — todo directo
const API_URL = "https://ts-currency-converter.onrender.com";

async function saveConversion(
    user: string, from: string, to: string,
    amount: number, result: number
): Promise<void> {
    await fetch(`${API_URL}/api/conversions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user, from, to, amount, result,
            timestamp: new Date().toLocaleTimeString()
        })
    });
}

async function fetchUserConversions(user: string): Promise<any[]> {
    const response = await fetch(
        `${API_URL}/api/conversions?user=${encodeURIComponent(user)}`
    );
    return await response.json();
}

async function registerUser(
    fullName: string, email: string, password: string
): Promise<any> {
    const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
    });
    return await response.json();
}

async function loginUser(email: string, password: string): Promise<any> {
    const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return await response.json();
}

async function fetchUsers(): Promise<any[]> {
    const response = await fetch(`${API_URL}/api/users`);
    return await response.json();
}