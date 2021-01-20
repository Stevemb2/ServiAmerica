import React, { useContext } from "react";
import { Link, navigate } from "@reach/router";
import UserContext from "../context/UserContext";
import { css } from "@emotion/css";
import Clock from "./Clock";
import "../../public/stylesheets/App.css";

import bengalImg from "../../public/images/bengal.jpg";
import germanShepherdImg from "../../public/images/german-shepherd.jpg";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);

  const logoff = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      loggedIn: false,
      lastLogin: ""
    });

    navigate("/");
  };

  const liStyle = css`
    float: left;
  `;

  const liaStyle = css`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    &:hover {
      background-color: #111;
    }
  `;

  const displayNavBar = () => {
    if (user.loggedIn === true) {
      return (
        <div
          className={css`
            position: sticky;
            top: 0;
            z-index: 10;
          `}
        >
          <ul
            className={css`
              list-style-type: none;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: #333;
            `}
          >
            <li className={liStyle}>
              <Link className={liaStyle} to="/taxestimator">
                Tax Estimator
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/taxtables">
                Tax Tables
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/mortgage">
                Mortgage
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/mailinglabels">
                Mailing Labels
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/emails">
                Emails
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/clients">
                Clients
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/templates">
                Templates
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/attachments">
                Attachments
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/users">
                Users
              </Link>
            </li>
            <li className={liStyle}>
              <a className={liaStyle} href="#" onClick={logoff}>
                Logoff
              </a>
            </li>
          </ul>
          <div
            className={css`
              color: white;
              background-color: mediumseagreen;
              padding: 5px;
            `}
          >
            <h2>
              <span>ServiAmerica</span>
              <img
                className={css`
                  float: left;
                `}
                height="70"
                src={ bengalImg }
                alt="cat"
              />
              <img
                className={css`
                  float: right;
                `}
                height="70"
                src={ germanShepherdImg }
                alt="dog"
              />
            </h2>
            <h4> Welcome {user.name} - Last login: {user.lastLogin} </h4>
          </div>
          <br />
        </div>
      );
    } else {
      return (
        <div
          className={css`
            position: sticky;
            top: 0;
            z-index: 10;
          `}
        >
          <ul
            className={css`
              list-style-type: none;
              margin: 0;
              padding: 0;
              overflow: hidden;
              background-color: #333;
            `}
          >
            <li className={liStyle}>
              <Link className={liaStyle} to="/">
                Home
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/taxestimator">
                Tax Estimator
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/mortgage">
                Mortgage
              </Link>
            </li>
            <li className={liStyle}>
              <Link className={liaStyle} to="/login">
                Login
              </Link>
            </li>
          </ul>
          <div
            className={css`
              color: white;
              background-color: mediumseagreen;
              padding: 5px;
            `}
          >
            <h2>
              <span>ServiAmerica</span>
              <img
                id="owner-image-1"
                height="70"
                src={ bengalImg }
                alt="bengal cat"
              />
              <img
                id="owner-image-2"
                height="70"
                src={ germanShepherdImg }
                alt="german shepherd"
              />
            </h2>
            <h4> Welcome</h4>
          </div>
          <br />
        </div>
      );
    }
  };

  return <div>{displayNavBar()}</div>;
};

export default NavBar;
