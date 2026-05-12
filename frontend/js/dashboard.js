const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");

async function loadDashboard() {
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const month = new Date().toISOString().slice(0, 7);

    try {
        const expensesRes = await fetch(`${API_URL}/expenses`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const expenses = await expensesRes.json();

        const budgetRes = await fetch(`${API_URL}/budget?month=${month}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const budgetData = await budgetRes.json();

        const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const budget = budgetData ? Number(budgetData.limit_amount) : 0;

        document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;
        document.getElementById("budget").innerText = budget > 0 ? `$${budget.toFixed(2)}` : "Not set";

        let status = "Normal";
        if (budget > 0) {
            if (total >= budget) {
                status = "Exceeded";
            } else if (total >= budget * 0.8) {
                status = "Warning";
            }
        }

        document.getElementById("status").innerText = status;

        renderChart(expenses);
    } catch (err) {
        console.error(err);
    }
}

function renderChart(expenses) {
    const ctx = document.getElementById("chart");
    if (!ctx) return;

    const categoryTotals = {};

    expenses.forEach(exp => {
        const cat = exp.category || "Other";
        categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(exp.amount);
    });

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals)
            }]
        }
    });
}

loadDashboard();