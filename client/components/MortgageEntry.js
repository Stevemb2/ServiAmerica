import React, { useState, useEffect } from "react";
import MortgageUtility from "../utilities/MortgageUtility";
import ValidationUtility from "../utilities/ValidationUtility";

const MortgageEntry = props => {
  const mortgageUtility = MortgageUtility();
  const validationUtility = ValidationUtility();

  const mortgage = props.mortgage;
  const setMortgage = props.setMortgage;

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [message, setMessage] = useState("");

  // Calculate monthly payment whenever mortgage changes - TODO finish!!!
  useEffect(() => {
    const message = validationUtility.validateMortgage(mortgage);

    if (!message) {
      const monthlyPayment = mortgageUtility.calculateMonthlyPayment(mortgage);
      setMonthlyPayment(monthlyPayment);
      setMessage("");
    } else {
      setMessage(message);
    }
  }, [mortgage]);

  let newMortgage = {
    amount: mortgage.amount,
    rate: mortgage.rate,
    term: mortgage.term,
    numberpayments: mortgage.numberpayments,
    downpayment: mortgage.downpayment,
    plotType: mortgage.plotType
  };

  return (
    <div>
      <h4>Calculate Monthly Payments</h4>
      <table>
        <tbody>
          <tr>
            <td>Amount:</td>
            <td>
              <span>$</span>
              <input
                className="entry-value"
                type="text"
                size="8"
                onChange={event => {
                  setMortgage(
                    Object.assign(newMortgage, { amount: event.target.value })
                  );
                }}
                value={mortgage.amount}
              />
            </td>
          </tr>
          <tr>
            <td>Interest Rate:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="5"
                onChange={event => {
                  setMortgage(
                    Object.assign(newMortgage, { rate: event.target.value })
                  );
                }}
                value={mortgage.rate}
              />
              <span> %</span>
            </td>
          </tr>
          <tr>
            <td>Term in Years:</td>
            <td>
              <select
                id="term"
                value={mortgage.term}
                onChange={event => {
                  setMortgage(
                    Object.assign(newMortgage, { term: event.target.value })
                  );
                }}
              >
                <option key="15" value="15">
                  15
                </option>
                <option key="30" value="30">
                  30
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Number Of Monthly Payments:</td>
            <td>
              <select
                id="numberpayments"
                value={mortgage.numberpayments}
                onChange={event => {
                  setMortgage(
                    Object.assign(newMortgage, {
                      numberpayments: event.target.value
                    })
                  );
                }}
              >
                <option key="1" value="1">
                  1
                </option>
                <option key="2" value="2">
                  2
                </option>
                <option key="3" value="3">
                  3
                </option>
                <option key="4" value="4">
                  4
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Down Payment:</td>
            <td>
              <span>$</span>
              <input
                className="entry-value"
                type="text"
                size="8"
                onChange={event => {
                  setMortgage(
                    Object.assign(newMortgage, {
                      downpayment: event.target.value
                    })
                  );
                }}
                value={mortgage.downpayment}
              />
            </td>
          </tr>
          <tr>
            <td>Principle:</td>
            <td>
              <span>${mortgage.amount - mortgage.downpayment}</span>
            </td>
          </tr>
          <tr>
            <td>Monthly Payment:</td>
            <td>
              <span>${monthlyPayment}</span>
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

export default MortgageEntry;
