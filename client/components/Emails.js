import React, { useState, useEffect } from "react";
import Button from "./Button";
import EmailService from "../services/EmailService";
import UserService from "../services/UserService";
import ClientService from "../services/ClientService";
import TemplateService from "../services/TemplateService";
import SettingsService from "../services/SettingsService";

const Emails = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [clientArray, setClientArray] = useState([""]);
  const [templateArray, setTemplateArray] = useState([""]);
  const [emailArray, setEmailArray] = useState([""]);
  const [name, setName] = useState("");
  const [sendBirthdateEmails, setSendBirthdateEmails] = useState(false);
  const [test, setTest] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  // Services

  const emailService = EmailService();
  const userService = UserService();
  const clientService = ClientService();
  const templateService = TemplateService();
  const settingsService = SettingsService();

  const selectClientRow = email => {
    setEmail({
      email: email
    });
  };

  // Effects

  useEffect(() => {
    userService
      .findAllUsers()
      .then(userArray => {
        const checkActive = user => {
          return user.status === "active" ? true : false;
        };

        const activeUserArray = userArray.filter(checkActive);

        setUserArray(activeUserArray);
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });

    clientService
      .findAllClients()
      .then(clientArray => {
        const checkActive = client => {
          return client.status === "active" ? true : false;
        };

        const activeClientArray = clientArray.filter(checkActive);

        setClientArray(activeClientArray);
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });

    templateService
      .findAllTemplates()
      .then(templateArray => {
        if (templateArray) {
          setName(templateArray[0].name);
          setTemplateArray(templateArray);
          getTemplateEmailArray(templateArray[0].name);
        }
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });

    settingsService
      .find()
      .then(settings => {
        if (settings) {
          setSenderEmail(settings.senderEmail);
          setName(settings.templateName);
          setEmail(settings.clientEmail);
          setSendBirthdateEmails(settings.sendBirthdateEmails);
          setTest(settings.test);
        }
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });
  }, []);

  // Functions

  const getTemplateEmailArray = name => {
    templateService
      .getTemplateEmailArray(name)
      .then(emailArray => {
        setEmailArray(emailArray);
      })
      .catch(err => {
        setIsError(true);
        setMessage(err);
      });
  };

  const clear = () => {
    setIsError(false);
    setMessage("");
  };

  return (
    <div>
      <h3>Emails</h3>
      <p>
        Assign template names to client emails that you want to send emails to.
      </p>
      <table>
        <tbody>
          <tr>
            <td>
              <span title="Set from user email">Sender Email:</span>
            </td>
            <td>
              <select
                value={senderEmail}
                onClick={event => {
                  settingsService
                    .setSenderEmail(event.target.value)
                    .then(senderEmail => {
                      setSenderEmail(senderEmail);
                      setIsError(false);
                      setMessage(message);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });

                  clear();
                }}
                onChange={event => {
                  settingsService
                    .setSenderEmail(event.target.value)
                    .then(senderEmail => {
                      setSenderEmail(senderEmail);
                      setIsError(false);
                      setMessage(message);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });

                  clear();
                }}
              >
                {userArray.map(user => (
                  <option key={user.email} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>Template Name: </span>
            </td>
            <td>
              <select
                value={name}
                onClick={() => {}}
                onChange={event => {
                  settingsService
                    .setTemplateName(event.target.value)
                    .then(name => {
                      setName(name);
                      getTemplateEmailArray(name);
                      setIsError(false);
                      setMessage(message);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });

                  clear();
                }}
              >
                {templateArray.map(template => (
                  <option key={template.name} value={template.name}>
                    {template.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>Client Email: </span>
            </td>
            <td>
              <select
                value={email}
                onClick={() => {}}
                onChange={event => {
                  settingsService
                    .setClientEmail(event.target.value)
                    .then(clientEmail => {
                      setEmail(clientEmail);
                      setIsError(false);
                      setMessage(message);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });

                  setEmail(event.target.value);
                  clear();
                }}
              >
                {clientArray.map(client => (
                  <option key={client.email} value={client.email}>
                    {client.email}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>Send Birthday Emails:</span>
            </td>
            <td>
              <span style={{ paddingRight: "5px" }}>True</span>
              <span style={{ paddingRight: "5px" }}>
                <input
                  type="radio"
                  name="set-send-birthday-emails"
                  value="true"
                  checked={sendBirthdateEmails === true}
                  onClick={() => {
                    settingsService
                      .setSendBirthdateEmails(true)
                      .then(() => {
                        emailService
                          .startSendingBirthdateEmails(senderEmail)
                          .then(message => {
                            setSendBirthdateEmails(true);
                            setIsError(false);
                            setMessage(message);
                          })
                          .catch(err => {
                            setIsError(true);
                            setMessage(err);
                          });
                      })
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });
                  }}
                  onChange={() => {
                    () => {
                      settingsService
                        .setSendBirthdateEmails(true)
                        .then(() => {
                          emailService
                            .startSendingBirthdateEmails(senderEmail)
                            .then(message => {
                              setSendBirthdateEmails(true);
                              setIsError(false);
                              setMessage(message);
                            })
                            .catch(err => {
                              setIsError(true);
                              setMessage(err);
                            });
                        })
                        .catch(err => {
                          setIsError(true);
                          setMessage(err);
                        });
                    };
                  }}
                ></input>
              </span>
              <span style={{ paddingRight: "5px" }}>False</span>
              <span style={{ paddingRight: "5px" }}>
                <input
                  type="radio"
                  name="set-send-birthday-emails"
                  value="false"
                  checked={sendBirthdateEmails === false}
                  onClick={() => {
                    settingsService
                      .setSendBirthdateEmails(false)
                      .then(() => {
                        emailService
                          .stopSendingBirthdateEmails()
                          .then(message => {
                            setSendBirthdateEmails(false);
                            setIsError(false);
                            setMessage(message);
                          })
                          .catch(err => {
                            setIsError(true);
                            setMessage(err);
                          });
                      })
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });
                  }}
                  onChange={() => {
                    settingsService
                      .setSendBirthdateEmails(false)
                      .then(() => {
                        emailService
                          .stopSendingBirthdateEmails()
                          .then(message => {
                            setSendBirthdateEmails(false);
                            setIsError(false);
                            setMessage(message);
                          })
                          .catch(err => {
                            setIsError(true);
                            setMessage(err);
                          });
                      })
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });
                  }}
                ></input>
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Test:</span>
            </td>
            <td>
              <span style={{ paddingRight: "5px" }}>True</span>
              <span style={{ paddingRight: "5px" }}>
                <input
                  type="radio"
                  name="set-test"
                  value={test}
                  checked={test === true}
                  onClick={() => {
                    settingsService
                      .setTest(true)
                      .then(() => {})
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });

                    setTest(true);
                  }}
                  onChange={() => {
                    settingsService
                      .setTest(true)
                      .then(() => {})
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });

                    setTest(true);
                  }}
                ></input>
              </span>
              <span style={{ paddingRight: "5px" }}>False</span>
              <span style={{ paddingRight: "5px" }}>
                <input
                  type="radio"
                  name="set-test"
                  value={test}
                  checked={test === false}
                  onClick={() => {
                    settingsService
                      .setTest(false)
                      .then(() => {})
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });

                    setTest(false);
                  }}
                  onChange={() => {
                    settingsService
                      .setTest(false)
                      .then(() => {})
                      .catch(err => {
                        setIsError(true);
                        setMessage(err);
                      });

                    setTest(false);
                  }}
                ></input>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Send Emails"
                type="primary"
                handler={() => {
                  emailService
                    .sendEmails(senderEmail, name)
                    .then(message => {
                      setIsError(false);
                      setMessage(message);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });
                }}
              />
            </td>
            <td>
              <Button
                name="Add Client"
                type="primary"
                handler={() => {
                  templateService
                    .addTemplateEmail(email, name)
                    .then(data => {
                      const { emailArray } = data;

                      setIsError(false);
                      setEmailArray(emailArray);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });
                }}
              />
            </td>
            <td>
              <Button
                name="Add All"
                type="primary"
                handler={() => {
                  templateService
                    .addAllTemplateEmails(name)
                    .then(data => {
                      const { message, emailArray } = data;

                      setIsError(false);
                      setMessage(message);
                      setEmailArray(emailArray);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });
                }}
                title="Add all clients"
              />
            </td>
            <td>
              <Button
                name="Delete Client"
                type="danger"
                handler={() => {
                  templateService
                    .deleteTemplateEmail(email, name)
                    .then(data => {
                      const { emailArray } = data;

                      setIsError(false);
                      setEmailArray(emailArray);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });
                }}
              />
            </td>
            <td>
              <Button
                name="Delete All"
                type="danger"
                title="Delete all clients"
                handler={() => {
                  templateService
                    .deleteAllTemplateEmails(name)
                    .then(data => {
                      const { message, emailArray } = data;

                      setIsError(false);
                      setMessage(message);
                      setEmailArray(emailArray);
                    })
                    .catch(err => {
                      setIsError(true);
                      setMessage(err);
                    });
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
      <div
        style={{
          color: isError ? "maroon" : "green",
          fontSize: "20px"
        }}
      >
        {message}
      </div>
      <br />
      <table>
        <tbody>
          <tr>
            <th>Client list for template name: {name}</th>
          </tr>
          {emailArray.map(email => (
            <tr
              className="table-row"
              key={email}
              onClick={() => {
                selectClientRow(email);
              }}
            >
              <td>
                <span> {email} </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Emails;
