import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateLoan from './components/CreateLoan';
import MakePayment from './components/MakePayment';
import ViewLedger from './components/ViewLedger';
import Overview from './components/Overview';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-loan" element={<CreateLoan />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/view-ledger/:loanId" element={<ViewLedger />} />
        <Route path="/overview/:customerId" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
