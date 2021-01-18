import React from "react";

const TaxEntry = props => {
  return (
    <div>
      <h3>Enter Tax Information</h3>
      <table>
        <tbody>
          <tr>
            <td>Filing Type: </td>
            <td>
              <select
                onBlur={event => {
                  props.setFilingType(event.target.value);
                }}
              >
                <option value="single">Single</option>
                <option value="married-jointly">Married Jointly</option>
                <option value="married-separately">Married Separately</option>
                <option value="head-of-household">Head of Household</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Income: </td>
            <td>
              <span>$ </span>
              <input
                className="entry-value"
                type="text"
                size="20"
                onChange={event => {
                  props.setIncome(event.target.value);
                }}
                value={props.income}
              />
            </td>
          </tr>
          <tr>
            <td>Child Deductions:</td>
            <td>
              <select
                onBlur={event => {
                  props.setChildDeductions(event.target.value);
                }}
              >
                <option value="0">No Children</option>
                <option value="1">One Child</option>
                <option value="2">Two Children</option>
                <option value="3">Three Children</option>
                <option value="4">Four Children</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Federal Deductions: </td>
            <td>
              <span>$ </span>
              <input
                className="entry-value"
                type="text"
                size="20"
                onChange={event => {
                  props.setFederalDeductions(event.target.value);
                }}
                value={props.federalDeductions}
              />
            </td>
          </tr>
          <tr>
            <td>State Deductions: </td>
            <td>
              <span>$ </span>
              <input
                className="entry-value"
                type="text"
                size="20"
                onChange={event => {
                  props.setStateDeductions(event.target.value);
                }}
                value={props.stateDeductions}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaxEntry;
