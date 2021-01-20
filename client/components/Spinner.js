import React from 'react';
import { css } from "@emotion/css";

const Spinner = ({ isDisplayed=false, yPos="50%" }) => {
    const display = isDisplayed ? "block" : "none";
    //const display = true ? "block" : "none";
    return (
        <div
            className={css`
                @keyframes spinner {
                    0% {
                    transform: translate3d(-50%, -50%, 0) rotate(0deg);
                    }
                    100% {
                    transform: translate3d(-50%, -50%, 0) rotate(360deg);
                    }
                }
                animation: 1.5s linear infinite spinner;
                animation-play-state: inherit;
                border: 8px solid green;
                border-color: green transparent transparent transparent;
                border-radius: 50%;
                content: "";
                height: 80px;
                width: 80px;
                position: absolute;
                top: ${yPos};
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                will-change: transform;
                display: ${display}
            `}
        >

        </div>
    );
};

export default Spinner;


