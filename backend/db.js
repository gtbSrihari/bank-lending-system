// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// DB file path
const dbPath = path.resolve(__dirname, 'bank.db');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT NOT NULL,
      principal REAL NOT NULL,
      rate REAL NOT NULL,
      period INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      emi REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER NOT NULL,
      type TEXT CHECK(type IN ('EMI', 'LUMP_SUM')) NOT NULL,
      amount REAL NOT NULL,
      payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(loan_id) REFERENCES loans(id)
    )
  `);
});

module.exports = db;
