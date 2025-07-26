import React, { useState } from 'react';
import axios from 'axios';

const MakePayment = () => {
  const [formData, setFormData] = useState({
    loan_id: '',
    amount: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/payments', formData);
      setMessage('Payment recorded successfully.');
      setFormData({ loan_id: '', amount: '' });
    } catch (error) {
      console.error(error);
      setMessage('Failed to record payment.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label>Loan ID</label>
        <input
          type="number"
          name="loan_id"
          value={formData.loan_id}
          onChange={handleChange}
          required
        />

        <label>Payment Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Payment</button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default MakePayment;
