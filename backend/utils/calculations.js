function calculateLoanDetails(principal, years, rate) {
  const interest = (principal * years * rate) / 100;
  const totalAmount = principal + interest;
  const numberOfEMIs = years * 12;
  const emi = Math.ceil(totalAmount / numberOfEMIs);

  return {
    interest,
    totalAmount,
    emi,
    numberOfEMIs
  };
}

module.exports = { calculateLoanDetails };
