import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const SettingsService = () => {
  const validationUtility = ValidationUtility();

  // For Emails.js

  const find = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-settings"
      };

      axios(options)
        .then(response => {
          let { isError, message, settings } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(settings);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const setSenderEmail = senderEmail => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-sender-email",
        data: {
          senderEmail: senderEmail
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(senderEmail);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const setTemplateName = templateName => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-template-name",
        data: {
          templateName: templateName
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(templateName);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const setClientEmail = clientEmail => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-client-email",
        data: {
          clientEmail: clientEmail
        }
      };

      axios(options)
        .then(response => {
          let { isError, message } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(clientEmail);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const getSendBirthdateEmails = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-send-birthdate-emails"
      };

      axios(options)
        .then(response => {
          let { isError, message, sendBirthdateEmails } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(sendBirthdateEmails);
          }
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  const setSendBirthdateEmails = sendBirthdateEmails => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-send-birthdate-emails",
        data: {
          // Data sent to server
          sendBirthdateEmails: sendBirthdateEmails
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

  const getTest = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-is-test"
      };

      axios(options)
        .then(response => {
          let { isError, message, test } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(test);
          }
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  const setTest = test => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-is-test",
        data: {
          // Data sent to server
          test: test
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

  // For MailingLabels.js

  const findMailingLabelInfo = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-mailing-label-info"
      };

      axios(options)
        .then(response => {
          const {
            isError,
            mailingLabelFont,
            mailingLabelFontSize,
            mailingLabelSpacing
          } = response.data;

          if (isError) {
            reject();
          } else {
            resolve({
              mailingLabelFont,
              mailingLabelFontSize,
              mailingLabelSpacing
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  // For Attachments.js

  const getAttachment = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-attachment"
      };

      axios(options)
        .then(response => {
          const { isError, attachment } = response.data;

          if (isError) {
            reject();
          } else {
            resolve(attachment);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const setAttachment = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "set-attachment"
      };

      axios(options)
        .then(response => {
          const { isError } = response.data;

          if (isError) {
            reject();
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
    find,
    setSenderEmail,
    setTemplateName,
    setClientEmail,
    getSendBirthdateEmails,
    setSendBirthdateEmails,
    getTest,
    setTest,
    findMailingLabelInfo,
    getAttachment,
    setAttachment
  });
};

export default SettingsService;
