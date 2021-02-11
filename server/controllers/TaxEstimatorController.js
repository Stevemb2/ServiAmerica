const TaxEstimatorController = taxEstimatorParams => {
  const { taxEstimatorRouter, taxEstimatorService } = taxEstimatorParams;

  taxEstimatorRouter.post("/calculate-tax", (req, res) => {
    res.type("application/json");

    const taxInformation = req.body.taxInformation;

    try {
      const { federalTax, stateTax } = taxEstimatorService.calculateTaxes(
        taxInformation
      );

      res.send({
        isError: false,
        federalTax: federalTax,
        stateTax: stateTax
      });
    } catch (err) {
      res.send({
        isError: true,
        message: `Failed to calculate tax: ${err}`
      });
    }
  });
};

export default TaxEstimatorController;
