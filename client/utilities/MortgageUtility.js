const MortgageUtility = () => {
  // Formula: Loan amount = Monthly Payment/ ((1 + Interest rate per annum/100) ** term) * term * 12
  const calculateMonthlyPayment = mortgage => {
    let { amount, rate, downpayment, numberpayments } = mortgage;

    const principle = amount - downpayment;
    rate = rate / 100 / 12;
    numberpayments = numberpayments * 12;

    let monthlyPayment =
      (principle * rate * Math.pow(1 + rate, numberpayments)) /
      (Math.pow(1 + rate, numberpayments) - 1);

    monthlyPayment = Math.floor(monthlyPayment * 100) / 100;

    return monthlyPayment;
  };

  return Object.freeze({
    calculateMonthlyPayment
  });
};

export default MortgageUtility;
