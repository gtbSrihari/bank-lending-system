# Bank Lending System

A simple full-stack application that simulates a bank lending system, built with React (frontend), Node.js + Express (backend), and SQLite (database).

## Features

- **Loan Creation**: Register new loans for customers.
- **Payment Handling**: Record repayments against loans.
- **Ledger Viewing**: View the transaction ledger of a specific loan.
- **Loan Overview**: Display the current status of all loans, including remaining balance and repayment history.


## Setup Instructions

### Backend

1. Navigate to the backend folder:
```bash
   cd backend
   npm install
   node server.js
```

2. Ensure SQLite is installed and added to your system path.

This project uses a local SQLite file for simplicity. The actual DB file path is not provided for privacy reasons. You can define your own inside db.js.

Frontend:

Navigate to the frontend folder:
```bash
cd frontend
npm install
npm start
```
Make sure the backend server is running on http://localhost:3001.

Notes:

The frontend connects to the backend via REST API using Axios.

The database stores data in a local file (bank.db), but the actual file path is excluded from the repo.

No external authentication or validation is used — this is a minimal educational prototype.