id="8d3ncs"
const db = require("../config/db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            description TEXT,
            category TEXT,
            date TEXT,
            user_id INTEGER
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            month TEXT,
            limit_amount REAL,
            user_id INTEGER
        )
    `);
});
