import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const EmailService = () => {
  const validationUtility = ValidationUtility();

  const sendEmails = (senderEmail, name) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "send-emails",
        data: {
          // Data sent to server
          senderEmail,
          name
        }
      };

      axios(options)
        .then(response => {
          let { message, isError } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(message);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const startSendingBirthdateEmails = senderEmail => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "start-sending-birthdate-emails",
        data: {
          senderEmail
        }
      };

      axios(options)
        .then(response => {
          let { message, isError } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(message);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const stopSendingBirthdateEmails = senderEmail => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "stop-sending-birthdate-emails",
        data: {
          senderEmail
        }
      };

      axios(options)
        .then(response => {
          let { message, isError } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(message);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    sendEmails,
    startSendingBirthdateEmails,
    stopSendingBirthdateEmails
  });
};

export default EmailService;
