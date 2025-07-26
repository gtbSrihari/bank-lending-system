// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const loanRoutes = require('./routes/loanRoutes');
const customerRoutes = require('./routes/customerRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/loans', loanRoutes);
app.use('/api/customers', customerRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
