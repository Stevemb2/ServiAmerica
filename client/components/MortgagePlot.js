import React, { useEffect } from "react";
import PlotUtility from "../utilities/PlotUtility";
import { css } from "@emotion/css";

const MortgagePlot = props => {
  const plotUtility = PlotUtility();

  const mortgage = props.mortgage;
  const setMortgage = props.setMortgage;

  const plotDimensions = {
    width: 840,
    height: 640
  };

  useEffect(() => {
    plotUtility.plotMortgage(mortgage, plotDimensions);
  }, [mortgage]);

  return (
    <div>
      <div>
        <h4>Amount ($1000s) vs Time (years)</h4>
        <h5>
          <span id="total">Total</span>, <span id="principle">Principle</span>,{" "}
          <span id="interest">Interest</span>
        </h5>
        <canvas
          id="mortgageCanvas"
          className={css`
            padding: 5;
            background-color: white;
          `}
          width={plotDimensions.width}
          height={plotDimensions.height}
        />
      </div>
      <div>
        <span>Plot Type:</span>&nbsp;
        <select
          value={mortgage.plotType}
          onBlur={event => {
            setMortgage({
              amount: mortgage.amount,
              rate: mortgage.rate,
              term: mortgage.term,
              numberpayments: mortgage.numberpayments,
              downpayment: mortgage.downpayment,
              plotType: event.target.value
            });
          }}
        >
          <option key="all" value="all">
            All
          </option>
          <option
            className={css`
              color: blue;
            `}
            key="total"
            value="total"
          >
            Total
          </option>
          <option
            className={css`
              color: green;
            `}
            key="principle"
            value="principle"
          >
            Principle
          </option>
          <option
            className={css`
              color: red;
            `}
            key="interest"
            value="interest"
          >
            Interest
          </option>
        </select>
      </div>
    </div>
  );
};

export default MortgagePlot;
