import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewLedger = () => {
  const [ledger, setLedger] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/loans/ledger');
        setLedger(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load ledger');
      }
    };

    fetchLedger();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Loan Ledger</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Customer Name</th>
              <th>Principal</th>
              <th>Interest Rate</th>
              <th>Term</th>
              <th>Total Payable</th>
              <th>Total Paid</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {ledger.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.customer_name}</td>
                <td>{loan.principal}</td>
                <td>{loan.interest_rate}%</td>
                <td>{loan.term_months} months</td>
                <td>{loan.total_payable}</td>
                <td>{loan.total_paid}</td>
                <td>{loan.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewLedger;
