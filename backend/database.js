const sqlite3 = require("sqlite3").verbose();

// Create or open the database
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});


// Create users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        password TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error("Error creating users table:", err.message);
    } else {
        console.log("Users table ready.");
    }
});

// Create products table
db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        image TEXT,
        description TEXT
    )
`, (err) => {
    if (err) {
        console.error("Error creating products table:", err.message);
    } else {
        console.log("Products table ready.");
    }
});


module.exports = db;