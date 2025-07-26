const express = require('express');
const router = express.Router();
const paymentModel = require('../models/paymentModel');

// Make a payment
router.post('/', (req, res) => {
  const { loan_id, amount_paid } = req.body;

  if (!loan_id || !amount_paid) {
    return res.status(400).json({ error: 'Loan ID and amount are required' });
  }

  paymentModel.makePayment(loan_id, amount_paid, (err, paymentId) => {
    if (err) return res.status(500).json({ error: 'Payment failed' });
    res.status(201).json({ paymentId, message: 'Payment successful' });
  });
});

// Get payments for a specific loan
router.get('/:loan_id', (req, res) => {
  const loanId = req.params.loan_id;

  paymentModel.getPaymentsByLoanId(loanId, (err, payments) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch payments' });
    res.json(payments);
  });
});

module.exports = router;
