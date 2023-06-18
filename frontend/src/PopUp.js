import React from "react";
import './PopUp.css';

const PopUp =( props) => {
    return (
        <div className='popup-box'>
            <div className='box'>
                <div className='popup-content'>{props.content}</div>
                <button className='btn-close' onClick={props.handleClose}>關閉</button>
            </div>
        </div>
    );
}

export default PopUp;