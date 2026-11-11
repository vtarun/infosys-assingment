
const PAYMENT_FREQUENCIES = {
  'monthly': 12,
  'quarterly': 4,
  'annually': 1,
  'at_maturity': 0
};


function validateTermDepositInputs({ principal, interestRate, termYears, frequency }) {
  if (typeof principal !== 'number' || isNaN(principal) || principal <= 0) {
    throw new Error('Deposit amount must be a positive number greater than 0.');
  }

  if (typeof interestRate !== 'number' || isNaN(interestRate) || interestRate < 0) {
    throw new Error('Interest rate must be a non-negative number.');
  }

  if (typeof termYears !== 'number' || isNaN(termYears) || termYears <= 0) {
    throw new Error('Investment term must be greater than 0 years.');
  }

  if (typeof frequency !== 'string' || !frequency.trim()) {
    throw new Error('Payment frequency must be a non-empty string.');
  }

  const normalizedFreq = frequency.trim().toLowerCase();
  if (PAYMENT_FREQUENCIES[normalizedFreq] === undefined) {
    throw new Error(`Unsupported frequency: "${frequency}"`);
  }
}

function calculateTermDeposit({ principal, interestRate, termYears, frequency }) {
  const normalizedFreq = frequency.trim().toLowerCase();
  const timesPerYear = PAYMENT_FREQUENCIES[normalizedFreq];

  const rateDecimal = interestRate / 100;
  let finalBalance;
  
  validateTermDepositInputs({ principal, interestRate, termYears, frequency });

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


console.log( calculateTermDeposit({principal: 10000, interestRate: 1.10, termYears: 3, frequency: 'monthly'}) );