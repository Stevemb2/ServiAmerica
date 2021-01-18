const TaxEstimatorService = (taxRatesUtilities, logger) => {
  const CHILD_CREDIT = 2000;

  const calculateTaxes = taxInformation => {
    const income = +taxInformation.income;
    const childDeductions = +taxInformation.childDeductions;
    const federalDeductions = +taxInformation.federalDeductions;
    const stateDeductions = +taxInformation.stateDeductions;
    const filingType = taxInformation.filingType;

    let federalIncome = income - childDeductions * CHILD_CREDIT;
    let stateIncome = income;

    let federalTax =
      (federalIncome - federalDeductions) *
      taxRatesUtilities.calculateTaxRate(income, filingType, true);
    let stateTax =
      (stateIncome - stateDeductions) *
      taxRatesUtilities.calculateTaxRate(income, filingType, false);

    return {
      federalTax,
      stateTax
    };
  };

  return Object.freeze({
    calculateTaxes
  });
};

module.exports = TaxEstimatorService;
