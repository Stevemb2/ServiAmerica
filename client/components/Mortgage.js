import React, { useState } from "react";
import MortgagePlot from "./MortgagePlot";
import MortgageEntry from "./MortgageEntry";

const Mortgage = () => {
  const [mortgage, setMortgage] = useState({
    amount: 415000.0,
    rate: 2.5,
    term: 30,
    numberpayments: 1,
    downpayment: 20000.0,
    plotType: "all"
  });

  return (
    <div>
      <h3>Mortgage</h3>
      <MortgagePlot mortgage={mortgage} setMortgage={setMortgage} />
      <br />
      <MortgageEntry mortgage={mortgage} setMortgage={setMortgage} />
    </div>
  );
};

export default Mortgage;
