import React from "react";

const TaxResults = props => {
  const formatCurrency = (strings, ...values) => {
    let formattedCurrency = "";

    for (let i = 0; i < strings.length; i++) {
      if (i > 0) {
        if (typeof values[i - 1] === "number") {
          formattedCurrency += `$${values[i - 1].toFixed(2)}`;
        } else {
          formattedCurrency += values[i - 1];
        }
      }

      formattedCurrency += strings[i];
    }

    // Add comma's for legibility
    formattedCurrency = formattedCurrency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedCurrency;
  };

  const formattedFederalTax = formatCurrency`${props.federalTax}`;
  const formattedStateTax = formatCurrency`${props.stateTax}`;
  const formattedTotalTax = formatCurrency`${+props.federalTax +
    +props.stateTax}`;

  return (
    <div>
      <h3>Tax Results</h3>
      <table>
        <tbody>
          <tr>
            <td>
              <span>Federal Tax: </span>
            </td>
            <td>{formattedFederalTax}</td>
          </tr>
          <tr>
            <td>
              <span>State Tax: </span>
            </td>
            <td>{formattedStateTax}</td>
          </tr>
          <tr>
            <td>
              <span>Total Tax: </span>
            </td>
            <td>{formattedTotalTax}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaxResults;
