import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const TemplateService = () => {
  const validationUtility = ValidationUtility();

  const findAllTemplates = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-all-templates"
      };

      axios(options)
        .then(response => {
          let { isError, message, templateArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(templateArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const addTemplate = template => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateTemplate(template);

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
        url: "add-template",
        data: {
          // Data sent to server
          name: template.name,
          subject: template.subject,
          body: template.body,
          type: template.type
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

  const updateTemplate = template => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateTemplate(template);

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
        url: "update-template",
        data: {
          // Data sent to server
          name: template.name,
          subject: template.subject,
          body: template.body,
          type: template.type
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

  const deleteTemplate = template => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateTemplate(template);

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
        url: "delete-template",
        data: {
          // Data sent to server
          email: template.email
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

  const getTemplateEmailArray = name => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-template-email-array",
        params: {
          name
        }
      };

      axios(options)
        .then(response => {
          const { isError, message, emailArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(emailArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const addTemplateEmail = (email, name) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "add-template-email",
        data: {
          // Data sent to server
          name,
          email
        }
      };

      axios(options)
        .then(response => {
          const { isError, message, emailArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve({
              emailArray
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const addAllTemplateEmails = name => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "add-all-template-emails",
        data: {
          // Data sent to server
          name
        }
      };

      axios(options)
        .then(response => {
          const { isError, message, emailArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve({
              message,
              emailArray
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deleteTemplateEmail = (email, name) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-template-email",
        data: {
          // Data sent to server
          name,
          email
        }
      };

      axios(options)
        .then(response => {
          let { isError, message, emailArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve({
              emailArray
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deleteAllTemplateEmails = name => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-all-template-emails",
        data: {
          // Data sent to server
          name
        }
      };

      axios(options)
        .then(response => {
          let { isError, message, emailArray } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve({
              message,
              emailArray
            });
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const attachAttachment = (template, attachmentName) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "attach-attachment",
        data: {
          // Data sent to server
          template,
          attachmentName
        }
      };

      axios(options)
        .then(response => {
          let { isError, message, template } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(template);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const dettachAttachment = (template, attachmentName) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "dettach-attachment",
        data: {
          // Data sent to server
          template,
          attachmentName
        }
      };

      axios(options)
        .then(response => {
          let { isError, message, template } = response.data;

          if (isError) {
            reject(message);
          } else {
            resolve(template);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    findAllTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateEmailArray,
    addTemplateEmail,
    addAllTemplateEmails,
    deleteTemplateEmail,
    deleteAllTemplateEmails,
    attachAttachment,
    dettachAttachment
  });
};

export default TemplateService;
