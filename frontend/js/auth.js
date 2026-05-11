 id="l02"
const API_URL = "http://localhost:3000";


// ================= REGISTER =================
document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    const errorEl = document.getElementById("error");
    const successEl = document.getElementById("success");

    if (errorEl) errorEl.innerText = "";
    if (successEl) successEl.innerText = "";

    if (password !== confirm) {
        if (errorEl) errorEl.innerText = "Passwords do not match.";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            if (errorEl) {
                errorEl.innerText =
                    data.error ||
                    data.message ||
                    "Registration failed";
            }
            return;
        }

        // AUTO LOGIN AFTER REGISTER
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
            localStorage.setItem("token", loginData.token);
            localStorage.setItem("userEmail", email);

            window.location.href = "dashboard.html";
        }

    } catch (err) {
        console.log(err);
        if (errorEl) {
            errorEl.innerText = "Server connection error";
        }
    }
});


// ================= LOGIN =================
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const errorEl = document.getElementById("error");

    if (errorEl) errorEl.innerText = "";

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            if (errorEl) {
                errorEl.innerText =
                    data.message ||
                    data.error ||
                    "Login failed";
            }
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);

        window.location.href = "dashboard.html";

    } catch (err) {
        console.log(err);
        if (errorEl) {
            errorEl.innerText = "Server connection error";
        }
    }
});
