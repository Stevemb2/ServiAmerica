import React, { useState, useEffect } from "react";
import Button from "./Button";
import TemplateService from "../services/TemplateService";
import AttachmentService from "../services/AttachmentService";

// State Variables

const Templates = () => {
  const [template, setTemplate] = useState({
    name: "",
    subject: "",
    body: "",
    type: "",
    attachmentArray: []
  });

  const [templateArray, setTemplateArray] = useState([]);
  const [attachmentArray, setAttachmentArray] = useState(["none"]);
  const [attachments, setAttachments] = useState("none");
  const [selectedAttachment, setSelectedAttachment] = useState(["none"]);
  const [message, setMessage] = useState("");

  // Services

  const templateService = TemplateService();
  const attachmentService = AttachmentService();

  // Effects

  const attachmentListToString = attachmentArray => {
    let attachments = "";

    attachmentArray.forEach((attachment, index) => {
      if (index < attachmentArray.length - 1) {
        attachments += `${attachment}, `;
      } else {
        attachments += attachment;
      }
    });

    return attachments;
  };

  useEffect(() => {
    attachmentService.getAttachmentArray().then(attachmentArray => {
      setAttachmentArray(attachmentArray);
    });
  }, [attachmentArray]);

  // Functions

  const findAllTemplates = () => {
    templateService
      .findAllTemplates()
      .then(templateArray => {
        setTemplateArray(templateArray);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const addTemplate = template => {
    templateService
      .addTemplate(template)
      .then(() => {
        findAllTemplates();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const updateTemplate = template => {
    templateService
      .updateTemplate(template)
      .then(() => {
        findAllTemplates();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const deleteTemplate = template => {
    templateService
      .deleteTemplate(template)
      .then(() => {
        findAllTemplates();
        clear();
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const clear = () => {
    setTemplate({
      name: "",
      subject: "",
      body: "",
      type: "standard"
    });

    setAttachments("none");

    setMessage("");
  };

  const selectTemplateRow = selectedTemplate => {
    setTemplate({
      name: selectedTemplate.name,
      subject: selectedTemplate.subject,
      body: selectedTemplate.body,
      type: selectedTemplate.type,
      arrayList: selectedTemplate.attachmentArray
    });

    setAttachments(attachmentListToString(selectedTemplate.attachmentArray));
  };

  useEffect(() => {
    templateService
      .findAllTemplates()
      .then(templateArray => {
        setTemplateArray(templateArray);
      })
      .catch(err => {
        setMessage(err);
      });
  }, []);

  let newTemplate = {
    name: template.name,
    subject: template.subject,
    body: template.body,
    type: template.type,
    emailArray: template.emailArray,
    attachmentArray: template.attachmentArray
  };

  return (
    <div>
      <h3>Templates</h3>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="100"
                onChange={event => {
                  setTemplate(
                    Object.assign(newTemplate, { name: event.target.value })
                  );
                }}
                value={template.name}
              />
            </td>
          </tr>
          <tr>
            <td>Subject:</td>
            <td>
              <input
                className="entry-value"
                type="text"
                size="100"
                onChange={event => {
                  setTemplate(
                    Object.assign(newTemplate, { subject: event.target.value })
                  );
                }}
                value={template.subject}
              />
            </td>
          </tr>
          <tr>
            <td>Body:</td>
            <td>
              <textarea
                className="entry-value"
                cols="100"
                rows="20"
                onChange={event => {
                  setTemplate(
                    Object.assign(newTemplate, { body: event.target.value })
                  );
                }}
                value={template.body}
              />
            </td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>
              <select
                id="type"
                value={template.type}
                onChange={event => {
                  setTemplate(
                    Object.assign(newTemplate, { type: event.target.value })
                  );
                }}
              >
                <option key="standard" value="standard">
                  standard
                </option>
                <option key="birthday" value="birthday">
                  birthday
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Attachment List:</td>
            <td>{attachments}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Add"
                type="primary"
                handler={() => {
                  addTemplate(template);
                }}
              />
            </td>
            <td>
              <Button
                name="Update"
                type="success"
                handler={() => {
                  updateTemplate(template);
                }}
              />
            </td>
            <td>
              <Button
                name="Delete"
                type="danger"
                handler={() => {
                  deleteTemplate(template);
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
      <table>
        <tbody>
          <tr>
            <td>
              <span> Attachments:</span>
            </td>
            <td>
              <select
                onChange={event => {
                  setSelectedAttachment(event.target.value);
                }}
              >
                {attachmentArray.map(attachment => (
                  <option key={attachment} value={attachment}>
                    {attachment}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <Button
                name="Attach"
                type="primary"
                handler={() => {
                  templateService
                    .attachAttachment(template, selectedAttachment)
                    .then(template => {
                      let attachments = attachmentListToString(
                        template.attachmentArray
                      );

                      setAttachments(attachments);
                      findAllTemplates();
                    })
                    .catch(err => {
                      setMessage(err);
                    });
                }}
              />
            </td>
            <td>
              <Button
                name="Dettach"
                type="danger"
                handler={() => {
                  templateService
                    .dettachAttachment(template, selectedAttachment)
                    .then(template => {
                      let attachments = attachmentListToString(
                        template.attachmentArray
                      );

                      setAttachments(attachments);
                      findAllTemplates();
                    })
                    .catch(err => {
                      setMessage(err);
                    });
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
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
            <th>Name</th>
            <th>Subject</th>
            <th>Type</th>
          </tr>
          {templateArray.map(template => (
            <tr
              className="table-row"
              key={template.name}
              onClick={() => {
                selectTemplateRow(template);
              }}
            >
              <td>
                <span>{template.name}</span>
              </td>
              <td>
                <span>{template.subject}</span>
              </td>
              <td>
                <span>{template.type}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Templates;
