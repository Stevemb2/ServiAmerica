import React, { useState, useEffect } from "react";
import Button from "./Button";
import SettingsService from "../services/SettingsService";
import MailingLabelsService from "../services/MailingLabelsService";

const MailingLabels = () => {
  const DEFAULT_FONT = "Times-Roman";
  const DEFAULT_SIZE = 12;
  const DEFAULT_SPACING = 2;
  const DEFAULT_PDF = `mailinglabels-${DEFAULT_FONT}-${DEFAULT_SIZE}-${DEFAULT_SPACING}.pdf`;
  const FONT_ARRAY = ["Times-Roman", "Courier", "Helvetica"];
  const FONT_SIZE_ARRAY = [
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32
  ];
  const SPACING_ARRAY = [
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8
  ];

  const settingsService = SettingsService();
  const mailingLabelsService = MailingLabelsService();

  // State

  const [font, setFont] = useState(DEFAULT_FONT);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [spacing, setSpacing] = useState(DEFAULT_SPACING);
  const [pdf, setPDF] = useState(DEFAULT_PDF);
  const [pdfArray, setPDFArray] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  // Effect

  useEffect(() => {
    mailingLabelsService
      .getPDFArray()
      .then(pdfArray => {
        setPDFArray(pdfArray);
      })
      .catch(err => {
        setMessage(err);
        setColor("maroon");
      });

    settingsService
      .findMailingLabelInfo()
      .then(data => {
        setFont(data.mailingLabelFont);
        setSize(data.mailingLabelFontSize);
        setSpacing(data.mailingLabelSpacing);
        findPDF(
          data.mailingLabelFont,
          data.mailingLabelFontSize,
          data.mailingLabelSpacing
        );
      })
      .catch(err => {
        setMessage(err);
        setColor("maroon");
      });
  }, []);

  const findPDF = (font, size, spacing) => {
    mailingLabelsService
      .findPDF(font, size, spacing)
      .then(() => {
        setColor("green");
        setMessage("");
        const pdf = `mailinglabels-${font}-${size}-${spacing}.pdf`;
        setPDF(pdf);
        setFont(font);
        setSize(size);
        setSpacing(spacing);
      })
      .catch(() => {
        setPDF(`blank.pdf`);
      });
  };

  const createPDF = (font, size, spacing) => {
    mailingLabelsService
      .createPDF(font, size, spacing)
      .then(pdfArray => {
        setPDFArray(pdfArray);
        setPDF(`mailinglabels-${font}-${size}-${spacing}.pdf`);
      })
      .catch(err => {
        setMessage(err);
        setColor("maroon");
      });
  };

  const deletePDF = pdf => {
    mailingLabelsService
      .deletePDF(pdf)
      .then(data => {
        const { message, pdfArray } = data;

        if (message) {
          setColor("maroon");
          setMessage(message);
        } else {
          setPDFArray(pdfArray);
          findPDF(DEFAULT_FONT, DEFAULT_SIZE, DEFAULT_SPACING);
        }
      })
      .catch(err => {
        setMessage(err);
        setColor("maroon");
      });
  };

  const parsePDFName = pdfName => {
    // pdf file name example: mailinglabels-Times-Roman-16-2
    // pdf file name example: mailinglabels-Courier-16-2
    const pdfNameArray = pdfName.split("-");
    let font = pdfNameArray[1];
    let size;
    let spacing;

    if (font === "Times") {
      font = font + "-" + pdfNameArray[2];
      size = pdfNameArray[3];
      spacing = pdfNameArray[4].split(".")[0];
    } else {
      size = pdfNameArray[2];
      spacing = pdfNameArray[3].split(".")[0];
    }

    return { font, size, spacing };
  };

  const reset = () => {
    findPDF(DEFAULT_FONT, DEFAULT_SIZE, DEFAULT_SPACING);
    setColor("green");
    setMessage("");
  };

  return (
    <div>
      <h3>Mailing Labels</h3>
      <table>
        <tbody>
          <tr>
            <td>Font:</td>
            <td>
              <select
                id="font"
                value={font}
                onClick={event => {
                  const selectedFont = event.target.value;
                  setFont(selectedFont);
                  findPDF(selectedFont, size, spacing);
                }}
                onChange={event => {
                  const selectedFont = event.target.value;
                  setFont(selectedFont);
                  findPDF(selectedFont, size, spacing);
                }}
              >
                {FONT_ARRAY.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Size:</td>
            <td>
              <select
                id="size"
                value={size}
                onChange={event => {
                  const selectedSize = event.target.value;
                  setSize(selectedSize);
                  findPDF(font, selectedSize, spacing);
                }}
              >
                {FONT_SIZE_ARRAY.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Spacing:</td>
            <td>
              <select
                id="spacing"
                value={spacing}
                onChange={event => {
                  const selectedSpacing = event.target.value;
                  setSpacing(selectedSpacing);
                  findPDF(font, size, selectedSpacing);
                }}
              >
                {SPACING_ARRAY.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>PDF Files:</td>
            <td>
              <select
                id="pdfs"
                value={pdf}
                onChange={event => {
                  const data = parsePDFName(event.target.value);
                  findPDF(data.font, data.size, data.spacing);
                  setPDF(event.target.value);
                }}
              >
                {pdfArray.map(pdf => (
                  <option key={pdf} value={pdf}>
                    {pdf}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
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
      <table>
        <tbody>
          <tr>
            <td>
              <Button
                name="Create"
                type="primary"
                title="Create PDF"
                handler={() => {
                  createPDF(font, size, spacing);
                }}
              />
            </td>
            <td>
              <Button
                name="Delete"
                type="danger"
                title="Delete PDF"
                handler={() => {
                  deletePDF(pdf);
                }}
              />
            </td>
            <td>
              <Button
                name="Reset"
                type="info"
                title="Reset to default"
                handler={() => {
                  reset();
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <h4>PDF View</h4>
      <div>
        <embed
          src={`mailinglabels/${pdf}`}
          type="application/pdf"
          width="100%"
          height="800px"
          border="none"
        />
      </div>
    </div>
  );
};

export default MailingLabels;
