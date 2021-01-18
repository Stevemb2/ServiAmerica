import React from "react";
import { css } from "@emotion/css";

const Button = props => {
  const { name, type, handler, title } = props;

  let backgroundColor = "#008cba"; // blue

  switch (type) {
    case "info":
      backgroundColor = "gray";
      break;
    case "primary":
      backgroundColor = "#008cba";
      break;
    case "success":
      backgroundColor = "green";
      break;
    case "warn":
      backgroundColor = "orange";
      break;
    case "danger":
      backgroundColor = "red";
      break;
    default:
      backgroundColor = "#008cba";
      break;
  }

  return (
    <button
      className={css`
        background-color: ${backgroundColor};
        border: none;
        border-radius: 4px;
        color: white;
        padding: 10px 24px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 2px 1px;
        cursor: pointer;
      `}
      onClick={handler}
      title={title}
    >
      {name}
    </button>
  );
};

export default Button;
