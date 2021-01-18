import React, { useState } from "react";
import { css } from "@emotion/css";
import Button from "./Button";
import ClientService from "../services/ClientService";
import DateUtility from "../utilities/DateUtility";
import LocationUtility from "../utilities/LocationUtility";

const Home = () => {
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
    status: "inactive"
  });

  let [color, setColor] = useState("green");
  let [message, setMessage] = useState("");

  let [selectedDay, setSelectedDay] = useState(currentDay);
  let [selectedYear, setSelectedYear] = useState(currentYear);
  let [selectedDayArray, setSelectedDayArray] = useState(dayArray);

  // Service

  const clientService = ClientService();

  const addClient = (client, isPersonal) => {
    clientService
      .addClient(client, isPersonal)
      .then(() => {
        clear();
        setColor("green");
        setMessage(`Thank you!`);
      })
      .catch(err => {
        setColor("maroon");
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
      status: "inactive"
    });

    setColor("green");
    setMessage("");
  };

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
    status: client.status,
    status: "inactive"
  };

  const asteriskStyle = css`
    color: red;
  `;

  return (
    <div>
      <h3>Please enter your personal information!</h3>

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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
                <span className={asteriskStyle}>*</span>
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
          </tbody>
        </table>
      </div>
      <br />
      <div>
        <span className={asteriskStyle}>*</span>&nbsp;<span>optional</span>
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Submit"
                type="primary"
                handler={() => {
                  addClient(client, true);
                  //navigate("/taxestimator");
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
      <br />
      <div>
        <span
          style={{
            color: color,
            fontSize: "20px"
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Home;
