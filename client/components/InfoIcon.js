import React from 'react';
import { css } from "@emotion/css";
import ReactTooltip from 'react-tooltip';
import Styles from "./Styles";

const InfoIcon = ({hoverText}) => {
    const styles = Styles();

    return (
        <React.Fragment>
            <div 
                className={css`
                    //position: relative;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    border: 1px solid ${styles.infoIconBorderColor};
                    border-radius: 50%;
                    text-align: center;
                    color: ${styles.textColor};
                    background: ${styles.backgroundColor};
                    font-size: 10px;
                    font-family: ${styles.fontFamily};
                    font-weight: bold;
                    margin: 10px;
                    //float: right;
                    &:hover {
                        border: none;
                        color: ${styles.backgroundColor};
                        background: ${styles.infoIconBackgroundColor};
                    }
                `}
                data-tip={ hoverText } 
            >
                i
            </div>
            <ReactTooltip 
                backgroundColor={styles.backgroundColor} 
                textColor={styles.textColor}
                border="true"
                borderColor={styles.textColor}
            />
        </React.Fragment>
    );
};

export default InfoIcon;


