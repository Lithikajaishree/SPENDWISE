const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
const email = localStorage.getItem("userEmail");

async function loadProfile() {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const username = email ? email.split("@")[0] : "Guest";
    const month = new Date().toISOString().slice(0, 7);

    try {
        const expensesRes = await fetch(`${API_URL}/expenses`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const expensesData = await expensesRes.json();

        if (!expensesRes.ok) {
            throw new Error(expensesData.error || expensesData.message || "Failed to load expenses");
        }

        const budgetRes = await fetch(`${API_URL}/budget?month=${month}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const budgetData = await budgetRes.json();

        if (!budgetRes.ok) {
            throw new Error(budgetData.error || budgetData.message || "Failed to load budget");
        }

        const total = expensesData.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const budget = budgetData ? Number(budgetData.limit_amount) : 0;

        document.getElementById("userEmail").innerText = email || "Not logged in";
        document.getElementById("username").innerText = username;
        document.getElementById("totalExpense").innerText = total.toFixed(2);
        document.getElementById("budget").innerText = budget.toFixed(2);
        document.getElementById("count").innerText = expensesData.length;
    } catch (err) {
        console.error("Profile load error:", err);
        alert(err.message || "Failed to load profile data.");
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
}

document.getElementById("logoutBtn")?.addEventListener("click", logout);

loadProfile();