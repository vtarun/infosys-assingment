/**
 * Frequency configuration mapping payout frequency to compounding intervals per year.
 */
const PAYMENT_FREQUENCIES = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
  at_maturity: 0
};

function calculateTermDeposit({ principal, interestRate, termYears, frequency }) {
  const normalizedFreq = frequency.trim().toLowerCase();
  const timesPerYear = PAYMENT_FREQUENCIES[normalizedFreq];

  const rateDecimal = interestRate / 100;
  let finalBalance;

  if (timesPerYear === 0) {    
    finalBalance = principal * (1 + rateDecimal * termYears);
  } else {
    
    finalBalance = principal * Math.pow(1 + rateDecimal / timesPerYear, timesPerYear * termYears);
  }

  const roundedBalance = Math.round(finalBalance);
  const roundedInterest = Math.round(finalBalance - principal);

  return {
    finalBalance: roundedBalance,
    totalInterest: roundedInterest
  };
}


