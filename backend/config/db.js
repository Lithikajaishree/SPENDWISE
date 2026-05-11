id="1jcld7"
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.log("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;

