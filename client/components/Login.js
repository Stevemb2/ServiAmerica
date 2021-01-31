import React, { useContext, useState } from "react";
import Button from "./Button";
import { navigate } from "@reach/router";
import Spinner from "./Spinner";
import UserContext from "../context/UserContext";
import UserService from "../services/UserService";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [isSpinnerDisplayed, setIsSpinnerDisplayed] = useState(false);

  const clearLoginPage = () => {
    setIsSpinnerDisplayed(false);

    setUser({
      name: "",
      email: "",
      password: "",
      isLoggedIn: false,
      lastLogin: ""
    });

    setMessage("");
  };

  const userService = UserService();

  const login = () => {
    userService
      .login({
        email: user.email,
        password: user.password
      })
      .then(({ name, lastLogin }) => {
        setUser({
          name: name,
          email: user.email,
          password: user.password,
          loggedIn: true,
          lastLogin: lastLogin
        });

        navigate("/taxestimator");
      })
      .catch(err => {
        setUser({
          name: "",
          email: "",
          password: "",
          loggedIn: false,
          lastLogin: ""
        });

        setMessage(err.message);
      });
  };

  return (
    <div>
      <Spinner isDisplayed={isSpinnerDisplayed}/>
      <table border="0" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td> &nbsp; </td>
            <td className="login-table-data">
              <h3> Log In </h3>
            </td>
          </tr>
          <tr>
            <td className="login-table-data">
              <span id="login-label"> Email: </span>
            </td>
            <td className="login-table-data">
              <input
                id="user-email-value"
                className="entry-value"
                type="text"
                size="40"
                onChange={event => {
                  setUser({
                    name: user.name,
                    email: event.target.value,
                    password: user.password,
                    loggedIn: user.loggedIn,
                    lastLogin: user.lastLogin
                  });
                }}
                onClick={() => {
                  setUser({
                    name: "",
                    email: "",
                    password: user.password,
                    loggedIn: false,
                    lastLogin: ""
                  });

                  setMessage("");
                }}
                value={user.email}
              />
            </td>
          </tr>
          <tr>
            <td className="login-table-data">
              <span id="password-label"> Password: </span>
            </td>
            <td className="login-table-data">
              <input
                id="password-value"
                className="entry-value"
                type="password"
                size="40"
                onChange={event => {
                  setUser({
                    name: user.name,
                    email: user.email,
                    password: event.target.value,
                    loggedIn: user.loggedIn,
                    lastLogin: user.lastLogin
                  });
                }}
                onClick={() => {
                  setUser({
                    name: user.name,
                    email: user.email,
                    password: "",
                    loggedIn: user.loggedIn,
                    lastLogin: user.lastLogin
                  });

                  setMessage("");
                }}
                value={user.password}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td> &nbsp; </td>
            <td>
              <Button name="Login" type="primary" handler={login} />
            </td>
            <td>
              <Button name="Clear" type="info" handler={clearLoginPage} />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <span
                style={{
                  color: "maroon",
                  fontSize: "20px"
                }}
              >
                {message}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;
