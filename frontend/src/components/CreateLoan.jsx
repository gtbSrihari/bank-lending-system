import React, { useState } from 'react';
import axios from 'axios';

const CreateLoan = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    amount: '',
    interest_rate: '',
    duration: '',
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
      await axios.post('http://localhost:3001/api/loans', formData);
      setMessage('Loan created successfully.');
      setFormData({
        customer_id: '',
        amount: '',
        interest_rate: '',
        duration: '',
      });
    } catch (error) {
      console.error(error);
      setMessage('Failed to create loan.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create New Loan</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label>Customer ID</label>
        <input
          type="number"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          required
        />

        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          name="interest_rate"
          value={formData.interest_rate}
          onChange={handleChange}
          required
        />

        <label>Duration (months)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Create Loan</button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateLoan;
