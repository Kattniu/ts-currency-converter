// Sin imports — todo directo
function getLoggedUser(): any | null {
    const raw = localStorage.getItem("loggedUser");
    if (!raw) return null;
    return JSON.parse(raw);
}

function saveUserSession(user: any): void {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

function requireAuth(): void {
    if (!getLoggedUser()) {
        window.location.href = "login.html";
    }
}

function logout(): void {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}