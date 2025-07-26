const db = require('../db');

const createPaymentTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS payments (
      payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER,
      amount_paid REAL,
      paid_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
    )
  `;
  db.run(query, (err) => {
    if (err) console.error('Error creating payments table:', err.message);
    else console.log('Payments table ready');
  });
};

const recordPayment = (loan_id, amount, callback) => {
  const query = `INSERT INTO payments (loan_id, amount_paid) VALUES (?, ?)`;
  db.run(query, [loan_id, amount], function (err) {
    callback(err, this?.lastID);
  });
};

const getPaymentsByLoanId = (loan_id, callback) => {
  const query = `SELECT * FROM payments WHERE loan_id = ? ORDER BY paid_at ASC`;
  db.all(query, [loan_id], callback);
};

module.exports = {
  createPaymentTable,
  recordPayment,
  getPaymentsByLoanId
};
