import axios from "axios";
import ValidationUtility from "../utilities/ValidationUtility";

const TaxTableService = () => {
  const validationUtility = ValidationUtility();

  const uploadTaxTable = taxTableFile => {
    return new Promise((resolve, reject) => {
      let message = validationUtility.validateTaxTable(taxTableFile.name);

      if (message !== undefined) {
        reject(message);
        return;
      }

      const formData = new FormData();

      formData.append("file", taxTableFile, taxTableFile.name);

      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${authToken}`
        },
        url: "upload-tax-table",
        data: formData
      };

      axios(options)
        .then(response => {
          const { isError, message } = response.data;

          if (isError === true) {
            reject(message);
          } else {
            resolve();
          }
        })
        .catch(function(err) {
          reject(
            `Failed to upload tax table file: ${taxTableFile.name}, error: ${err}`
          );
        });
    });
  };

  const getTaxTableArray = () => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "get-tax-table-array"
      };

      axios(options)
        .then(response => {
          const { isError, message, taxTableArray } = response.data;

          if (isError === true) {
            reject(message);
          } else {
            resolve(taxTableArray);
          }
        })
        .catch(function(err) {
          reject(`Failed to retreive tax tables, error: ${err}`);
        });
    });
  };

  const processTaxDataArray = taxDataArray => {
    const singleTaxDataArray = [];
    const marriedJointlyTaxDataArray = [];
    const marriedSeparatelyTaxDataArray = [];
    const headOfHouseholdTaxDataArray = [];

    taxDataArray.forEach(taxData => {
      switch (taxData.status) {
        case "single":
          singleTaxDataArray.push({
            rate: taxData.rate,
            income: taxData.income
          });

          break;
        case "married-jointly":
          marriedJointlyTaxDataArray.push({
            rate: taxData.rate,
            income: taxData.income
          });

          break;
        case "married-separately":
          marriedSeparatelyTaxDataArray.push({
            rate: taxData.rate,
            income: taxData.income
          });

          break;
        case "head-of-household":
          headOfHouseholdTaxDataArray.push({
            rate: taxData.rate,
            income: taxData.income
          });

          break;
      }
    });

    return {
      single: singleTaxDataArray,
      marriedJointly: marriedJointlyTaxDataArray,
      marriedSeparately: marriedSeparatelyTaxDataArray,
      headOfHousehold: headOfHouseholdTaxDataArray
    };
  };

  const readTaxTable = taxTableName => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "read-tax-table",
        data: {
          taxTableName: taxTableName
        }
      };

      axios(options)
        .then(response => {
          const { isError, message, taxDataArray } = response.data;

          if (isError === true) {
            reject(message);
          } else {
            const taxData = processTaxDataArray(taxDataArray);
            resolve(taxData);
          }
        })
        .catch(function(err) {
          reject(`Failed to read tax table: ${taxTableName}, error: ${err}`);
        });
    });
  };

  const removeTaxTable = taxTableName => {
    return new Promise((resolve, reject) => {
      const authToken = validationUtility.getCookie("authToken");

      const options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${authToken}`
        },
        url: "remove-tax-table",
        data: {
          // Data sent to server
          taxTableName: taxTableName
        }
      };

      axios(options)
        .then(response => {
          resolve(response.data);
          const { isError, message } = response.data;

          if (isError === true) {
            reject(message);
          } else {
            resolve();
          }
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  return Object.freeze({
    getTaxTableArray,
    uploadTaxTable,
    readTaxTable,
    removeTaxTable
  });
};

export default TaxTableService;
