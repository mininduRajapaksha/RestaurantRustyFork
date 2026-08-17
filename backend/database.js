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


module.exports = db;