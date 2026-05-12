const API_URL = "http://localhost:3000";

async function saveBudget() {
    const token = localStorage.getItem("token");
    const budget = document.getElementById("budgetInput").value;
    const month = new Date().toISOString().slice(0, 7);

    const res = await fetch(`${API_URL}/budget`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            month,
            limit_amount: budget
        })
    });

    if (res.ok) {
        document.getElementById("budgetStatus").innerText =
            "Budget saved successfully!";
    }
}
