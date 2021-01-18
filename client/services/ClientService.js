import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const ClientService = () => {
  const validationUtility = ValidationUtility();

  const findAllClients = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-all-clients"
      };

      axios(options)
        .then(response => {
          const { isError, message, clientArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(clientArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const findClient = email => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-client",
        params: {
          email: email
        }
      };

      axios(options)
        .then(response => {
          const { isError, message, client } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(client);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const addGuest = (client, isPersonal = false, isDelete = false) => {
    return new Promise((resolve, reject) => {
      const message = validationUtility.validateClient(
        client,
        isPersonal,
        isDelete
      );

      if (message !== undefined) {
        reject(message);
        return;
      }

      const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "add-guest",
        data: {
          // Data sent to server
          email: client.email,
          honorific: client.honorific,
          firstname: client.firstname,
          lastname: client.lastname,
          areacode: +client.areacode,
          prefix: +client.prefix,
          linenumber: +client.linenumber,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: +client.zip,
          language: client.language,
          birthmonth: client.birthmonth,
          birthday: +client.birthday,
          birthyear: +client.birthyear,
          status: client.status
        }
      };

      axios(options)
        .then(response => {
          const { isError, message } = response.data;

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

  const addClient = (client, isPersonal = false, isDelete = false) => {
    return new Promise((resolve, reject) => {
      const message = validationUtility.validateClient(
        client,
        isPersonal,
        isDelete
      );

      if (message !== undefined) {
        reject(message);
        return;
      }

      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "add-client",
        data: {
          // Data sent to server
          email: client.email,
          honorific: client.honorific,
          firstname: client.firstname,
          lastname: client.lastname,
          areacode: +client.areacode,
          prefix: +client.prefix,
          linenumber: +client.linenumber,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: +client.zip,
          language: client.language,
          birthmonth: client.birthmonth,
          birthday: +client.birthday,
          birthyear: +client.birthyear,
          status: client.status
        }
      };

      axios(options)
        .then(response => {
          const { isError, message } = response.data;

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

  const updateClient = (client, isPersonal = false, isDelete = false) => {
    return new Promise((resolve, reject) => {
      const message = validationUtility.validateClient(
        client,
        isPersonal,
        isDelete
      );

      if (message !== undefined) {
        reject(message);
        return;
      }

      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "update-client",
        data: {
          // Data sent to server
          email: client.email,
          honorific: client.honorific,
          firstname: client.firstname,
          lastname: client.lastname,
          areacode: +client.areacode,
          prefix: +client.prefix,
          linenumber: +client.linenumber,
          address: client.address,
          city: client.city,
          state: client.state,
          zip: +client.zip,
          language: client.language,
          birthmonth: client.birthmonth,
          birthday: +client.birthday,
          birthyear: +client.birthyear,
          status: client.status
        }
      };

      axios(options)
        .then(response => {
          const { isError, message } = response.data;

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

  const deleteClient = (client, isPersonal = false) => {
    return new Promise((resolve, reject) => {
      const message = validationUtility.validateClient(
        client,
        isPersonal,
        true
      );

      if (message !== undefined) {
        reject(message);
        return;
      }

      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-client",
        data: {
          // Data sent to server
          email: client.email
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

  // TODO finish below

  const getClientsFileNameArray = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-clients-file-array"
      };

      axios(options)
        .then(response => {
          const { message, clientsFileNameArray } = response.data;

          if (message !== undefined) {
            reject(message);
          } else {
            resolve(clientsFileNameArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const uploadClients = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "upload-clients"
      };

      axios(options)
        .then(response => {
          const { isError, message, client } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(client);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const importClients = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "import-clients"
      };

      axios(options)
        .then(response => {
          const { isError, message, client } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(client);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const exportClients = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "export-clients"
      };

      axios(options)
        .then(response => {
          const { isError, message, client } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(client);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deleteClients = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-clients"
      };

      axios(options)
        .then(response => {
          const { isError, message, client } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(client);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    findAllClients,
    findClient,
    addGuest,
    addClient,
    updateClient,
    deleteClient,
    getClientsFileNameArray,
    uploadClients,
    importClients,
    exportClients,
    deleteClients
  });
};

export default ClientService;
