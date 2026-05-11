const API_URL = "http://localhost:3000";
const token = localStorage.getItem("token");


// ================= ADD EXPENSE =================
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
            "Authorization": token
        },
        body: JSON.stringify({
            amount,
            description,
            category,
            date
        })
    });

    if (res.ok) {
        alert("Expense added successfully!");
        window.location.href = "expenses.html";
    }
});


// ================= LOAD EXPENSES =================
async function loadExpenses() {
    const res = await fetch(`${API_URL}/expenses`, {
        headers: {
            "Authorization": token
        }
    });

    const expenses = await res.json();
    displayExpenses(expenses);
}


// ================= DISPLAY =================
function displayExpenses(list) {
    const ul = document.getElementById("expenseList");
    const totalEl = document.getElementById("total");

    if (!ul) return;

    ul.innerHTML = "";
    let total = 0;

    list.forEach((exp) => {
        total += Number(exp.amount);

        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            <strong>${exp.amount}</strong> - ${exp.category} - ${exp.date}<br>
            <small>${exp.description}</small>

            <button onclick="deleteExpense(${exp.id})"
                class="btn btn-danger btn-sm float-end">
                Delete
            </button>
        `;

        ul.appendChild(li);
    });

    totalEl.innerText = total;
}


// ================= DELETE =================
async function deleteExpense(id) {
    await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    });

    loadExpenses();
}


loadExpenses();
