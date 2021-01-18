import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const AttachmentService = () => {
  const validationUtility = ValidationUtility();

  const getAttachmentArray = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-attachment-array"
      };

      axios(options)
        .then(response => {
          const attachmentArray = response.data;

          resolve(attachmentArray);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  const uploadAttachment = selectedAttachment => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      formData.append("file", selectedAttachment, selectedAttachment.name);

      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${authToken}`
        },
        url: "upload-attachment",
        data: formData
      };

      axios(options)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err.message);
        });
    });
  };

  const removeAttachment = attachmentName => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "remove-attachment",
        data: {
          // Data sent to server
          attachmentName: attachmentName
        }
      };

      axios(options)
        .then(data => {
          if (data.message) {
            reject(data.message);
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
    getAttachmentArray,
    uploadAttachment,
    removeAttachment
  });
};

export default AttachmentService;
