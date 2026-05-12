const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");
let allExpenses = [];

document.getElementById("expenseForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const amount = Number(document.getElementById("amount").value);
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const res = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            amount,
            description,
            category,
            date
        })
    });

    const data = await res.json();

    if (res.ok) {
        alert("Expense added successfully!");
        window.location.href = "expenses.html";
    } else {
        alert(data.error || data.message || "Failed to add expense.");
    }
});

async function loadExpenses() {
    const listEl = document.getElementById("expenseList");
    if (!listEl) return;

    const res = await fetch(`${API_URL}/expenses`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || data.message || "Failed to load expenses.");
        return;
    }

    allExpenses = data;
    displayExpenses(allExpenses);
}

function displayExpenses(list) {
    const ul = document.getElementById("expenseList");
    const totalEl = document.getElementById("total");

    if (!ul || !totalEl) return;

    ul.innerHTML = "";
    let total = 0;

    if (list.length === 0) {
        ul.innerHTML = `<li class="list-group-item">No expenses found</li>`;
        totalEl.innerText = "0.00";
        return;
    }

    list.forEach((exp) => {
        total += Number(exp.amount);

        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            <strong>${Number(exp.amount).toFixed(2)}</strong> - ${exp.category} - ${exp.date}<br>
            <small>${exp.description || ""}</small>

            <button onclick="deleteExpense(${exp.id})"
                class="btn btn-danger btn-sm float-end">
                Delete
            </button>
        `;

        ul.appendChild(li);
    });

    totalEl.innerText = total.toFixed(2);
}

function filterExpenses() {
    const dateValue = document.getElementById("filterDate")?.value;
    const categoryValue = document.getElementById("filterCategory")?.value;

    let filtered = [...allExpenses];

    if (dateValue) {
        filtered = filtered.filter(exp => exp.date === dateValue);
    }

    if (categoryValue) {
        filtered = filtered.filter(exp => exp.category === categoryValue);
    }

    displayExpenses(filtered);
}

async function deleteExpense(id) {
    const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.error || data.message || "Failed to delete expense.");
        return;
    }

    loadExpenses();
}

loadExpenses();
