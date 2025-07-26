import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Overview = () => {
  const [overviewData, setOverviewData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/payments/overview');
        setOverviewData(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load customer overview');
      }
    };

    fetchOverview();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Customer Loan Overview</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Loans</th>
              <th>Total Amount Borrowed</th>
              <th>Total Paid</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            {overviewData.map((row, index) => (
              <tr key={index}>
                <td>{row.customer_name}</td>
                <td>{row.total_loans}</td>
                <td>{row.total_borrowed}</td>
                <td>{row.total_paid}</td>
                <td>{row.total_balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Overview;
