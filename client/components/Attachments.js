import React, { useState, useEffect } from "react";
import Button from "./Button";
import AttachmentService from "../services/AttachmentService";
//import SettingsService from "../services/SettingsService";

const Attachments = () => {
  // States

  const [selectedFile, setSelectedFile] = useState(undefined);
  const [selectedAttachment, setSelectedAttachment] = useState("none.jpg");
  const [attachmentArray, setAttachmentArray] = useState(["none.jpg"]);
  const [message, setMessage] = useState("");

  // Services

  const attachmentService = AttachmentService();
  //const settingsService = SettingsService();

  // Effects

  useEffect(() => {
    attachmentService.getAttachmentArray().then(attachmentArray => {
      setAttachmentArray(attachmentArray);
    });
  }, [attachmentArray]);

  /* TODO not working need to fix!
   useEffect(() => {
      settingsService.getAttachment().then(attachment => {
         if (!attachment) {
            setSelectedAttachment("none.jpg");
         } else {
            setSelectedAttachment(attachment);
         }
      });
   }, []);
   */

  // Functions

  const uploadAttachment = () => {
    attachmentService
      .uploadAttachment(selectedFile) // TODO changed from selectedAttachment
      .then(() => {
        attachmentArray.push(selectedFile.name); // TODO changed from selectedAttachment
        setAttachmentArray(attachmentArray);
        setSelectedAttachment(selectedFile.name); // TODO changed from selectedAttachment
      })
      .catch(err => {
        setMessage(err);
      });
  };

  const removeAttachment = () => {
    attachmentService
      .removeAttachment(selectedAttachment)
      .then(() => {
        const newAttachmentArray = [];

        attachmentArray.forEach(attachment => {
          if (attachment !== selectedAttachment.name) {
            newAttachmentArray.push(attachment);
          }
        });

        setAttachmentArray(newAttachmentArray);
      })
      .catch(err => {
        setMessage(err);
      });
  };

  let imageSrc = `attachments/${selectedAttachment}`;

  return (
    <div>
      <h3>Attachments</h3>
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
        <span className="button-span">
          <Button
            name="Upload"
            type="primary"
            handler={() => {
              uploadAttachment();
              setSelectedAttachment("none.jpg");
            }}
          />
        </span>
        <span className="button-span">
          <Button
            name="Delete"
            type="danger"
            handler={() => {
              removeAttachment();
              setSelectedAttachment("none.jpg");
            }}
          />
        </span>
        <span className="button-span">
          <Button
            name="Clear"
            type="info"
            handler={() => {
              setMessage("");
              setSelectedAttachment("none.jpg");
            }}
          />
        </span>
      </div>
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
      <div>
        <table>
          <tbody>
            <tr>
              <td>Select Attachment:</td>
              <td>
                <select
                  value={selectedAttachment}
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
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h4>Attachment View</h4>
      </div>
      <div>
        <img 
          src={ imageSrc } 
          width="1000px" 
          alt="Attachment" 
        />
      </div>
    </div>
  );
};

export default Attachments;
