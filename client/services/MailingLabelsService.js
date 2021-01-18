import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const MailingLabelsService = () => {
  const validationUtility = ValidationUtility();

  const getPDFArray = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-pdf"
      };

      axios(options)
        .then(response => {
          const { message, pdfArray } = response.data;

          if (message) {
            reject(message);
          } else {
            resolve(pdfArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const findPDF = (font, size, spacing) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "find-pdf",
        data: {
          font: font,
          size: size,
          spacing: spacing
        }
      };

      axios(options)
        .then(response => {
          const { message } = response.data;

          if (message) {
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

  const createPDF = (font, size, spacing) => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "create-pdf",
        data: {
          font: font,
          size: size,
          spacing: spacing
        }
      };

      axios(options)
        .then(response => {
          const { message, pdfArray } = response.data;

          if (message) {
            reject(message);
          } else {
            resolve(pdfArray);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const deletePDF = pdf => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "delete-pdf",
        data: {
          pdf
        }
      };

      axios(options)
        .then(response => {
          const data = response.data;
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return Object.freeze({
    getPDFArray,
    findPDF,
    createPDF,
    deletePDF
  });
};

export default MailingLabelsService;
