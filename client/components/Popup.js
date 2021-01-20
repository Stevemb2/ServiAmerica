import React from "react";
import { css } from "@emotion/css";

const Popup = (props) => {
    return (
        <div 
            className={css`
                position: fixed;
                background: #00000050;
                width: 100%;
                height: 100vh;
                top: 0;
                left: 0;
            `}
        >
            <div 
                className={css`
                    position: relative;
                    width: 70%;
                    margin: 0 auto;
                    height: auto;
                    max-height: 70vh;
                    margin-top: calc(100vh - 85vh - 20px);
                    background: #fff;
                    border-radius: 4px;
                    padding: 20px;
                    border: 1px solid #999;
                    overflow: auto;                
                `}
            >
                <span 
                    className={css`
                        content: 'x';
                        cursor: pointer;
                        position: fixed;
                        right: calc(15% + 92px);
                        top: calc(100vh - 85vh - 0px);
                        width: 50px;
                        height: 50px;
                        line-height: 30px;
                        text-align: center;
                        font-size: 30px;
                        color: lightgray;
                    `} 
                    onClick={props.handleClose}
                >
                    &#xd7;
                </span>
                {props.content}
            </div>
        </div>
      );
};

export default Popup;

