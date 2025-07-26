const express = require('express');
const router = express.Router();
const loanModel = require('../models/loanModel');
const { calculateLoanDetails } = require('../utils/calculations');

// Create a loan
router.post('/', (req, res) => {
  const { customer_name, principal_amount, years, rate_of_interest } = req.body;

  if (!customer_name || !principal_amount || !years || !rate_of_interest) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const loanDetails = calculateLoanDetails(principal_amount, years, rate_of_interest);

  loanModel.createLoan(
    customer_name,
    principal_amount,
    years,
    rate_of_interest,
    loanDetails.totalAmount,
    loanDetails.emi,
    (err, loanId) => {
      if (err) return res.status(500).json({ error: 'Failed to create loan' });
      res.status(201).json({ loanId, ...loanDetails });
    }
  );
});

// Get all loans
router.get('/', (req, res) => {
  loanModel.getAllLoans((err, loans) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch loans' });
    res.json(loans);
  });
});

// Get loan by ID
router.get('/:id', (req, res) => {
  const loanId = req.params.id;

  loanModel.getLoanById(loanId, (err, loan) => {
    if (err || !loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  });
});

module.exports = router;
