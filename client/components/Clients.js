import React, { useState, useEffect } from "react";

import Button from "./Button";

import ClientService from "../services/ClientService";
import DateUtility from "../utilities/DateUtility";
import LocationUtility from "../utilities/LocationUtility";

const Clients = () => {
  const dateUtility = DateUtility();
  const locationUtility = LocationUtility();

  let stateArray = locationUtility.getStateArray();

  let currentMonth = dateUtility.getCurrentMonth();
  let currentDay = dateUtility.getCurrentDay();
  let currentYear = dateUtility.getCurrentYear();

  let monthArray = dateUtility.getMonthArray();
  let dayArray = dateUtility.getDayArray(currentMonth, currentYear);
  let yearArray = dateUtility.getYearArray();

  // State

  let [client, setClient] = useState({
    email: "",
    honorific: "Mr.",
    firstname: "",
    lastname: "",
    areacode: 111,
    prefix: 111,
    linenumber: 1111,
    address: "",
    city: "",
    state: "California",
    zip: 11111,
    language: "English",
    birthmonth: currentMonth,
    birthday: currentDay,
    birthyear: currentYear,
    status: "active"
  });

  let [clientArray, setClientArray] = useState([]);

  let [message, setMessage] = useState("");

  let [selectedDay, setSelectedDay] = useState(currentDay);
  let [selectedYear, setSelectedYear] = useState(currentYear);
  let [selectedDayArray, setSelectedDayArray] = useState(dayArray);

  const [selectedFile] = useState(undefined);
  const [selectedFileName, setSelectedFileName] = useState("none");

  const [clientsFileNameArray, setClientsFileNameArray] = useState(["none"]);

  // Service

  const clientService = ClientService();

  const findAllClients = () => {
    clientService
      .findAllClients()
      .then(clientArray => {
        setClientArray(clientArray);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const findClient = email => {
    clientService
      .findClient(email)
      .then(client => {
        setClient(client);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const addClient = client => {
    clientService
      .addClient(client)
      .then(() => {
        findAllClients();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const updateClient = client => {
    clientService
      .updateClient(client)
      .then(() => {
        findAllClients();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const deleteClient = client => {
    clientService
      .deleteClient(client)
      .then(() => {
        findAllClients();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const clear = () => {
    setClient({
      email: "",
      honorific: "Mr.",
      firstname: "",
      lastname: "",
      areacode: 111,
      prefix: 111,
      linenumber: 1111,
      address: "",
      city: "",
      state: "California",
      zip: 11111,
      language: "English",
      birthmonth: currentMonth,
      birthday: currentDay,
      birthyear: currentYear,
      status: "active"
    });

    setMessage("");
  };

  // TODO finish below

  const uploadClients = () => {
    clientService
      .uploadClients(selectedFile) // TODO changed from selectedAttachment
      .then(() => {
        clientsFileNameArray.push(selectedFile.name); // TODO changed from selectedAttachment
        setClientsArray(clientsFileNameArray);
        setSelectedClients(selectedFile.name); // TODO changed from selectedAttachment
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const importClients = () => {
    clientService
      .importClients(selectedFile.name)
      .then(() => {
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const exportClients = () => {
    clientService
      .exportClients(client)
      .then(() => {
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const deleteClients = () => {
    clientService
      .deleteClients(client)
      .then(() => {
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const selectClientRow = selectedClient => {
    setClient({
      email: selectedClient.email,
      honorific: selectedClient.honorific,
      firstname: selectedClient.firstname,
      lastname: selectedClient.lastname,
      areacode: +selectedClient.areacode,
      prefix: +selectedClient.prefix,
      linenumber: +selectedClient.linenumber,
      address: selectedClient.address,
      city: selectedClient.city,
      state: selectedClient.state,
      zip: +selectedClient.zip,
      language: selectedClient.language,
      birthmonth: selectedClient.birthmonth,
      birthday: +selectedClient.birthday,
      birthyear: +selectedClient.birthyear,
      status: selectedClient.status
    });
  };

  useEffect(() => {
    clientService
      .findAllClients()
      .then(clientArray => {
        setClientArray(clientArray);
      })
      .catch(err => {
        setMessage(err);
      });
  }, []);

  /**/
  useEffect(() => {
    clientService
      .getClientsFileNameArray()
      .then(clientsFileNameArray => {
        setClientsFileNameArray(clientsFileNameArray);
      })
      .catch(err => {
        setMessage(err);
      });
  }, []);
  /**/

  let newClient = {
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
  };

  return (
    <div>
      <h3>Clients</h3>

      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <span>Email:</span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="40"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, { email: event.target.value })
                    );
                  }}
                  value={client.email}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Honorific:</span>
              </td>
              <td>
                <select
                  id="type"
                  value={client.honorific}
                  onBlur={event => {
                    setClient(
                      Object.assign(newClient, {
                        honorific: event.target.value
                      })
                    );
                  }}
                >
                  <option key={"Mr."} value="Mr.">
                    Mr.
                  </option>
                  <option key={"Mrs."} value="Mrs.">
                    Mrs.
                  </option>
                  <option key={"Ms."} value="Ms.">
                    Ms.
                  </option>
                  <option key={"Dr."} value="Dr.">
                    Dr.
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <span>First Name:</span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="40"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, {
                        firstname: event.target.value
                      })
                    );
                  }}
                  value={client.firstname}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Last Name: </span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="40"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, { lastname: event.target.value })
                    );
                  }}
                  value={client.lastname}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Phone: </span>
              </td>
              <td>
                <span>
                  <input
                    className="entry-value"
                    type="text"
                    size="3"
                    onChange={event => {
                      setClient(
                        Object.assign(newClient, {
                          areacode: +event.target.value
                        })
                      );
                    }}
                    value={client.areacode}
                  />
                </span>
                <span>-</span>
                <span>
                  <input
                    className="entry-value"
                    type="text"
                    size="3"
                    onChange={event => {
                      setClient(
                        Object.assign(newClient, {
                          prefix: +event.target.value
                        })
                      );
                    }}
                    value={client.prefix}
                  />
                </span>
                <span>-</span>
                <span>
                  <input
                    className="entry-value"
                    type="text"
                    size="4"
                    onChange={event => {
                      setClient(
                        Object.assign(newClient, {
                          linenumber: +event.target.value
                        })
                      );
                    }}
                    value={client.linenumber}
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Address:</span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="40"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, { address: event.target.value })
                    );
                  }}
                  value={client.address}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>City:</span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="40"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, { city: event.target.value })
                    );
                  }}
                  value={client.city}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>State: </span>
              </td>
              <td>
                <select
                  id="type"
                  value={client.state}
                  onBlur={event => {
                    setClient(
                      Object.assign(newClient, { state: event.target.value })
                    );
                  }}
                >
                  {stateArray.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <span>Zip: </span>
              </td>
              <td>
                <input
                  className="entry-value"
                  type="text"
                  size="5"
                  onChange={event => {
                    setClient(
                      Object.assign(newClient, { zip: +event.target.value })
                    );
                  }}
                  value={client.zip}
                />
              </td>
            </tr>
            <tr>
              <td>
                <span>Language:</span>
              </td>
              <td>
                <select
                  id="language"
                  value={client.language}
                  onBlur={event => {
                    setClient(
                      Object.assign(newClient, { language: event.target.value })
                    );
                  }}
                >
                  <option key={"English"} value="English">
                    English
                  </option>
                  <option key={"Spanish"} value="Spanish">
                    Spanish
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <span>Birth Date:</span>
              </td>
              <td>
                <span>
                  <select
                    id="birthmonth"
                    value={client.birthmonth}
                    onBlur={event => {
                      setClient(
                        Object.assign(newClient, {
                          birthmonth: event.target.value
                        })
                      );
                      setSelectedMonth(event.target.value);
                      alert(
                        `selected month: ${selectedMonth}, selecte year: ${selectedYear}`
                      );
                      let dayArray = getDayArray(selectedMonth, selectedYear);
                      setSelectedDayArray(dayArray);
                    }}
                  >
                    {monthArray.map(month => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </span>
                <span> </span>
                <span>
                  <select
                    id="birthday"
                    value={client.birthday}
                    onBlur={event => {
                      setClient(
                        Object.assign(newClient, {
                          birthday: +event.target.value
                        })
                      );
                      setSelectedDay(event.target.value);
                    }}
                  >
                    {selectedDayArray.map(day => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </span>
                <span>, </span>
                <span>
                  <select
                    id="birthyear"
                    value={client.birthyear}
                    onBlur={event => {
                      setClient(
                        Object.assign(newClient, {
                          birthyear: +event.target.value
                        })
                      );
                      setSelectedYear(+event.target.value);
                      let dayArray = getDayArray(
                        selectedDay,
                        +event.target.value
                      );
                      setSelectedDayArray(dayArray);
                    }}
                  >
                    {yearArray.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span>Status:</span>
              </td>
              <td>
                <select
                  id="status"
                  value={client.status}
                  onBlur={event => {
                    setClient(
                      Object.assign(newClient, { status: event.target.value })
                    );
                  }}
                >
                  <option key={"active"} value="active">
                    active
                  </option>
                  <option key={"inactive"} value="inactive">
                    inactive
                  </option>
                  <option key={"suspended"} value="suspended">
                    suspended
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Find"
                type="primary"
                handler={() => {
                  findClient(client.email);
                }}
                title="Find by email"
              />
            </td>
            <td>
              <Button
                name="Add"
                type="primary"
                handler={() => {
                  addClient(client);
                }}
              />
            </td>
            <td>
              <Button
                name="Update"
                type="success"
                handler={() => {
                  updateClient(client);
                }}
              />
            </td>
            <td>
              <Button
                name="Delete"
                type="danger"
                handler={() => {
                  deleteClient(client);
                }}
              />
            </td>
            <td>
              <Button
                name="Clear"
                type="info"
                handler={() => {
                  clear();
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/*}
         <h4>Clients File Operations</h4>
         <div>
            <label className="file-upload">
               <input
                  className="upload"
                  type="file"
                  name=""
                  onChange={event => {
                     setSelectedFile(event.target.files[0]);
                  }}
               />
            </label>
         </div>
         <br />
         <div>
            <table>
               <tbody>
                  <tr>
                     <td>Select Client File:</td>
                     <td>
                        <select
                           value={selectedFileName}
                           onChange={event => {
                              setSelectedFileName(event.target.value);
                           }}
                        >
                           {clientsFileNameArray.map(clientsFileName => (
                              <option key={clientsFileName} value={clientsFileName}>
                                 {clientsFileName}
                              </option>
                           ))}
                        </select>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div>
            <table>
               <tbody>
                  <tr>
                     <td>
                        <Button name="Upload" type="primary" handler={() => {
                           uploadClients();
                        }} title="Upload" />
                     </td>
                     <td>
                        <Button name="Import" type="primary" handler={() => {
                           importClients();
                        }} title="Import" />
                     </td>
                     <td>
                        <Button name="Export" type="primary" handler={() => {
                           exportClients();
                        }} />
                     </td>
                     <td>
                        <Button name="Delete" type="danger" handler={() => {
                           deleteClients();
                        }} />
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
                     */}
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
            <th>Honorific</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Language</th>
            <th>Birth Date</th>
            <th>Status</th>
          </tr>
          {clientArray.map(client => (
            <tr
              className="table-row"
              key={client.email}
              onClick={() => {
                selectClientRow(client);
              }}
            >
              <td> {client.email}</td>
              <td> {client.honorific} </td>
              <td> {client.firstname} </td>
              <td> {client.lastname} </td>
              <td>
                {" "}
                {`${client.areacode}-${client.prefix}-${client.linenumber}`}{" "}
              </td>
              <td> {client.address} </td>
              <td> {client.city} </td>
              <td> {client.state} </td>
              <td> {client.zip} </td>
              <td> {client.language} </td>
              <td>
                {" "}
                {`${client.birthmonth} ${client.birthday}, ${client.birthyear}`}{" "}
              </td>
              <td> {client.status} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
