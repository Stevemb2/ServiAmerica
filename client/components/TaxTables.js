import React, { useState, useEffect } from "react";
import Button from "./Button";
import TaxTableService from "../services/TaxTableService";

const TaxTables = () => {
  // States

  const [selectedTaxTable, setSelectedTaxTable] = useState("none");
  const [taxTableArray, setTaxTableArray] = useState([["none"]]);

  const [taxDataArray, setTaxDataArray] = useState([]);
  const [singleTaxDataArray, setSingleTaxDataArray] = useState([]);
  const [marriedJointlyTaxDataArray, setMarriedJointlyTaxDataArray] = useState(
    []
  );
  const [
    marriedSeparatelyTaxDataArray,
    setMarriedSeparatelyTaxDataArray
  ] = useState([]);
  const [
    headOfHouseholdTaxDataArray,
    setHeadOfHouseholdTaxDataArray
  ] = useState([]);

  const [status, setStatus] = useState("Single");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState();

  // Effects

  useEffect(() => {
    getTaxTableArray();
    readTaxTable(selectedTaxTable);
  }, []);

  // Services

  const taxTableService = TaxTableService();

  // Functions

  const uploadTaxTable = () => {
    if (selectedTaxTable === "none") {
      setIsError(true);
      setMessage("Must select a tax table");
      return;
    }

    taxTableService
      .uploadTaxTable(selectedTaxTable)
      .then(() => {
        taxTableArray.push(selectedTaxTable.name);

        setTaxTableArray(taxTableArray);
        setSelectedTaxTable(taxTableArray[0]);
        setIsError(false);
        clear();
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });
  };

  const getTaxTableArray = () => {
    taxTableService
      .getTaxTableArray()
      .then(taxTableArray => {
        setTaxTableArray(taxTableArray);
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });
  };

  const readTaxTable = selectedTaxTable => {
    taxTableService
      .readTaxTable(selectedTaxTable)
      .then(taxData => {
        setSingleTaxDataArray(taxData.single);
        setMarriedJointlyTaxDataArray(taxData.marriedJointly);
        setMarriedSeparatelyTaxDataArray(taxData.marriedSeparately);
        setHeadOfHouseholdTaxDataArray(taxData.headOfHousehold);
        setStatus("single");
        setTaxDataArray(taxData.single);
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
        setTaxDataArray([]);
        setMarriedJointlyTaxDataArray([]);
        setMarriedSeparatelyTaxDataArray([]);
        setHeadOfHouseholdTaxDataArray([]);
      });
  };

  const removeTaxTable = () => {
    if (selectedTaxTable === "none") {
      setIsError(true);
      setMessage("Must select a tax table");
      return;
    }

    taxTableService
      .removeTaxTable(selectedTaxTable)
      .then(() => {
        const newTaxTableArray = [];

        taxTableArray.forEach(taxTable => {
          if (taxTable !== selectedTaxTable) {
            newTaxTableArray.push(taxTable);
          }
        });

        setTaxTableArray(newTaxTableArray);
        setSelectedTaxTable(newTaxTableArray[0]);
        setIsError(false);
        clear();
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });
  };

  const clear = () => {
    setIsError(false);
    setMessage("");
    setSelectedTaxTable("none");
    readTaxTable("none");
    setStatus("single");
    setTaxDataArray([]);
  };

  return (
    <div>
      <h3>Tax Tables</h3>
      <div>
        <label className="file-upload">
          <input
            className="upload"
            type="file"
            name=""
            onChange={event => {
              setSelectedTaxTable(event.target.files[0]);
            }}
          />
        </label>
      </div>
      <br />
      <div>
        <span className="button-span">
          <Button
            name="Upload"
            type="primary"
            handler={() => {
              uploadTaxTable(selectedTaxTable);
            }}
          />
        </span>
        <span className="button-span">
          <Button
            name="Delete"
            type="danger"
            handler={() => {
              removeTaxTable();
            }}
          />
        </span>
        <span className="button-span">
          <Button
            name="Clear"
            type="info"
            handler={() => {
              clear();
            }}
          />
        </span>
      </div>
      <br />
      <div>
        <span
          style={{
            color: isError ? "maroon" : "green",
            fontSize: "20px"
          }}
        >
          {message}
        </span>
      </div>
      <br />
      <div>
        <table>
          <tbody>
            <tr>
              <td>Select Tax Table:</td>
              <td>
                <select
                  value={selectedTaxTable}
                  onBlur={event => {
                    setSelectedTaxTable(event.target.value);
                    readTaxTable(event.target.value);
                  }}
                >
                  <option key="none" value="none">
                    none
                  </option>
                  {taxTableArray.map(taxTable => (
                    <option key={taxTable} value={taxTable}>
                      {taxTable}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Select Status:</td>
              <td>
                <select
                  value={status}
                  onBlur={event => {
                    const selectedStatus = event.target.value;

                    setStatus(selectedStatus);

                    switch (selectedStatus) {
                      case "single":
                        setTaxDataArray(singleTaxDataArray);
                        break;
                      case "marriedJointly":
                        setTaxDataArray(marriedJointlyTaxDataArray);
                        break;
                      case "marriedSeparately":
                        setTaxDataArray(marriedSeparatelyTaxDataArray);
                        break;
                      case "headOfHousehold":
                        setTaxDataArray(headOfHouseholdTaxDataArray);
                        break;
                    }
                  }}
                >
                  <option key="single" value="single">
                    Single
                  </option>
                  <option key="marriedJointly" value="marriedJointly">
                    Married Jointly
                  </option>
                  <option key="marriedSeparately" value="marriedSeparately">
                    Married Separately
                  </option>
                  <option key="headOfHousehold" value="headOfHousehold">
                    Head of Household
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h4>Tax Table View</h4>
      </div>
      <hr />
      <div>
        <table>
          <tbody>
            <tr>
              <th>Rate</th>
              <th>Minimum Income</th>
              <th>Maximum Income</th>
            </tr>
            {taxDataArray.map((taxData, index) => (
              <tr className="table-row" key="index">
                <td> {taxData.rate} </td>
                <td>
                  {" "}
                  {index === 0 ? 0 : +taxDataArray[index - 1].income + 1}{" "}
                </td>
                <td>
                  {" "}
                  {index === taxDataArray.length - 1
                    ? "None"
                    : taxData.income}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxTables;
