import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bank Lending System</h1>
      <ul>
        <li><Link to="/create-loan">Create Loan</Link></li>
        <li><Link to="/make-payment">Make Payment</Link></li>
        <li><Link to="/view-ledger/1">View Ledger (Loan ID: 1)</Link></li>
        <li><Link to="/overview/1">Customer Overview (Customer ID: 1)</Link></li>
      </ul>
    </div>
  );
}

export default App;
