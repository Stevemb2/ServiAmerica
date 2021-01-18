import React from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/css";

import bengalCatImage from "./images/bengalcat.jpg";
import Main from "./components/Main";

const App = () => {
    return (
        <div>
            <Main />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

