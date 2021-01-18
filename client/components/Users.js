import React, { useState, useEffect } from "react";
import Button from "./Button";
import UserService from "../services/UserService";

const Users = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    status: "",
    lastLogin: ""
  });

  const [userArray, setUserArray] = useState([]);

  const [message, setMessage] = useState("");

  const userService = UserService();

  const findAllUsers = () => {
    userService
      .findAllUsers()
      .then(userArray => {
        setUserArray(userArray);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const addUser = user => {
    userService
      .addUser(user)
      .then(() => {
        findAllUsers();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const updateUser = user => {
    userService
      .updateUser(user)
      .then(() => {
        findAllUsers();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const deleteUser = user => {
    userService
      .deleteUser(user)
      .then(() => {
        findAllUsers();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const clear = () => {
    setUser({
      email: "",
      password: "",
      name: "",
      status: "",
      lastLogin: ""
    });

    setMessage("");
  };

  const selectUserRow = selectedUser => {
    setUser({
      email: selectedUser.email,
      password: selectedUser.password,
      name: selectedUser.name,
      status: selectedUser.status,
      lastLogin: selectedUser.lastLogin
    });
  };

  useEffect(() => {
    userService
      .findAllUsers()
      .then(userArray => {
        setUserArray(userArray);
      })
      .catch(err => {
        setMessage(err);
      });
  }, []);

  let newUser = {
    email: user.email,
    password: user.password,
    name: user.name,
    status: user.status,
    lastLogin: user.lastLogin
  };

  return (
    <div>
      <h3>Users</h3>
      <br />
      <table>
        <tbody>
          <tr>
            <td>Email:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="40"
                onChange={event => {
                  setUser(
                    Object.assign(newUser, { email: event.target.value })
                  );
                }}
                value={user.email}
              />
            </td>
          </tr>
          <tr>
            <td>Password:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="40"
                onChange={event => {
                  setUser(
                    Object.assign(newUser, { password: event.target.value })
                  );
                }}
                value={user.password}
              />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="40"
                onChange={event => {
                  setUser(Object.assign(newUser, { name: event.target.value }));
                }}
                value={user.name}
              />
            </td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <select
                id="status"
                value={user.status}
                onBlur={event => {
                  setUser(
                    Object.assign(newUser, { status: event.target.value })
                  );
                }}
              >
                <option key="active" value="active">
                  active
                </option>
                <option key="inactive" value="inactive">
                  inactive
                </option>
                <option key="suspended" value="suspended">
                  suspended
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Last Login:</td>
            <td>
              <span>{user.lastLogin}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Add"
                type="primary"
                handler={() => {
                  addUser(user);
                }}
              />
            </td>
            <td>
              <Button
                name="Update"
                type="success"
                handler={() => {
                  updateUser(user);
                }}
              />
            </td>
            <td>
              <Button
                name="Delete"
                type="danger"
                handler={() => {
                  deleteUser(user);
                }}
              />
            </td>
            <td>
              <Button name="Clear" type="info" handler={clear} />
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
      <br />
      <table>
        <tbody>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Name</th>
            <th>Status</th>
            <th>Last Login</th>
          </tr>
          {userArray.map(user => (
            <tr
              className="table-row"
              key={[user.email]}
              onClick={() => {
                selectUserRow(user);
              }}
            >
              <td>
                <span>{user.email}</span>
              </td>
              <td>
                <span>{user.password}</span>
              </td>
              <td>
                <span>{user.name}</span>
              </td>
              <td>
                <span>{user.status}</span>
              </td>
              <td>
                <span>{user.lastLogin}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
