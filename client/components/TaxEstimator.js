import React, { useState } from "react";
import Button from "./Button";
import TaxEntry from "./TaxEntry";
import TaxResults from "./TaxResults";
import TaxEstimatorService from "../services/TaxEstimatorService";

const TaxEstimator = () => {
  const [income, setIncome] = useState(0);
  const [childDeductions, setChildDeductions] = useState(0);
  const [federalDeductions, setFederalDeductions] = useState(0);
  const [stateDeductions, setStateDeductions] = useState(0);
  const [filingType, setFilingType] = useState("single");
  const [federalTax, setFederalTax] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [message, setMessage] = useState("");

  const taxesEstimatorService = TaxEstimatorService();

  const clear = () => {
    setFilingType("single");
    setIncome(0);
    setChildDeductions(0);
    setFederalDeductions(0);
    setStateDeductions(0);
    setFederalTax(0);
    setStateTax(0);
    setMessage("");
  };

  const calculate = () => {
    const taxInformation = {
      income,
      childDeductions,
      federalDeductions,
      stateDeductions,
      filingType
    };

    taxesEstimatorService
      .calculate(taxInformation)
      .then(data => {
        setFederalTax(data.federalTax);
        setStateTax(data.stateTax);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  return (
    <div>
      <TaxEntry
        income={income}
        setIncome={setIncome}
        childDeductions={childDeductions}
        setChildDeductions={setChildDeductions}
        federalDeductions={federalDeductions}
        setFederalDeductions={setFederalDeductions}
        stateDeductions={stateDeductions}
        setStateDeductions={setStateDeductions}
        filingType={filingType}
        setFilingType={setFilingType}
      />
      <br />
      <TaxResults federalTax={federalTax} stateTax={stateTax} />
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Calculate"
                type="primary"
                handler={() => {
                  calculate();
                }}
              />
            </td>
            <td>
              <Button
                name="Clear"
                type="info"
                handler={() => {
                  clear();
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div>
        <span
          style={{
            color: "maroon",
            fontSize: "20px"
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default TaxEstimator;
