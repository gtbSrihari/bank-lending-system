const db = require('../db');

const createLoanTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS loans (
      loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT,
      principal REAL,
      rate REAL,
      period_years INTEGER,
      interest REAL,
      total_amount REAL,
      emi REAL,
      total_emis INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.run(query, (err) => {
    if (err) console.error('Error creating loans table:', err.message);
    else console.log('Loans table ready');
  });
};

const insertLoan = (data, callback) => {
  const query = `
    INSERT INTO loans (
      customer_id, principal, rate, period_years, interest, total_amount, emi, total_emis
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    data.customer_id,
    data.principal,
    data.rate,
    data.period_years,
    data.interest,
    data.total_amount,
    data.emi,
    data.total_emis
  ];
  db.run(query, params, function (err) {
    callback(err, this?.lastID);
  });
};

const getLoanById = (loan_id, callback) => {
  db.get(`SELECT * FROM loans WHERE loan_id = ?`, [loan_id], callback);
};

const getAllLoansByCustomer = (customer_id, callback) => {
  db.all(`SELECT * FROM loans WHERE customer_id = ?`, [customer_id], callback);
};

module.exports = {
  createLoanTable,
  insertLoan,
  getLoanById,
  getAllLoansByCustomer
};
