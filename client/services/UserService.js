import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

/*
POST   Create
GET    Read
PUT    Update
DELETE Delete
 */
const UserService = () => {
  const validationUtility = ValidationUtility();

  const login = data => {
    return new Promise((resolve, reject) => {      
      const options = {
        method: "post",
        header: {
          "Content-Type": "application/json"
        },
        url: "http://localhost:3000/login",
        data: {
          // Data sent to server
          email: data.email,
          password: data.password
        }
      };

      axios(options)
        .then(response => {
          let { name, lastLogin, message, isError, token } = response.data;

          if (isError) {
            reject(message);
          } else {
            document.cookie = `authToken = ${token}`;

            resolve({
              name: name,
              lastLogin: lastLogin
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const findAllUsers = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-all-users"
      };

      axios(options)
        .then(response => {
          let { isError, message, userArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(userArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const addUser = user => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateUser(user);

      const authToken = validationUtility.getCookie("authToken");

      if (message !== undefined) {
        reject(message);
        return;
      }

      if (!user.status) {
        user.status = "active";
      }

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "add-user",
        data: {
          // Data sent to server
          name: user.name,
          email: user.email,
          password: user.password,
          status: user.status,
          lastLogin: user.lastLogin
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const updateUser = user => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateUser(user);

      const authToken = validationUtility.getCookie("authToken");

      if (message !== undefined) {
        reject(message);
        return;
      }

      const options = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "update-user",
        data: {
          // Data sent to server
          name: user.name,
          email: user.email,
          password: user.password,
          status: user.status,
          lastLogin: user.lastLogin
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deleteUser = user => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateUser(user);

      const authToken = validationUtility.getCookie("authToken");

      if (message !== undefined) {
        reject(message);
        return;
      }

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-user",
        data: {
          // Data sent to server
          email: user.email
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve();
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    login,
    findAllUsers,
    addUser,
    updateUser,
    deleteUser
  });
};

export default UserService;
