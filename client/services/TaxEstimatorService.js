import axios from "axios";

const TaxEstimatorService = () => {
  const calculate = taxInformation => {
    return new Promise((resolve, reject) => {
      const options = {
        method: "post",
        header: {
          "Content-Type": "application/json"
        },
        url: "calculate-tax",
        data: {
          taxInformation
        }
      };

      axios(options)
        .then(response => {
          let { isError, message, federalTax, stateTax } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve({
              federalTax: federalTax,
              stateTax: stateTax
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    calculate
  });
};

export default TaxEstimatorService;
