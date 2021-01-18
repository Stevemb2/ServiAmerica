import React, { useState } from "react";
import { Router } from "@reach/router";
import UserContext from "../context/UserContext";
import Login from "./Login";
import Mortgage from "./Mortgage";
import MailingLabels from "./MailingLabels";
import NavBar from "./NavBar";
import Home from "./Home";
import TaxEstimator from "./TaxEstimator";
import TaxTables from "./TaxTables";
import Emails from "./Emails";
import Clients from "./Clients";
import Templates from "./Templates";
import Attachments from "./Attachments";
import Users from "./Users";
import { css } from "@emotion/css";
import "../App.css";

const Main = () => {
  const userHook = useState({
    name: "",
    email: "",
    password: "",
    loggedIn: false,
    lastLogin: ""
  });

  return (
    <UserContext.Provider value={userHook}>
      <div className="App">
        <div
          className={css`
            text-align: center;
          `}
        >
          <NavBar />
          <Router>
            <Home path="/" />
            <TaxEstimator path="/taxestimator" />
            <TaxTables path="/taxtables" />
            <Mortgage path="/mortgage" />
            <MailingLabels path="/mailinglabels" />
            <Emails path="/emails" />
            <Clients path="/clients" />
            <Templates path="/templates" />
            <Attachments path="/attachments" />
            <Users path="/users" />
            <Login path="/login" />
          </Router>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Main;
