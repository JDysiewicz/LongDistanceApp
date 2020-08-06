import React from "react";
import "./styles/message.css";

const Message = (props) => {
    return(
        <div className="comment">
            <a href="/" className="avatar">
                <img alt="avatar" src="https://semantic-ui.com/images/avatar/small/matt.jpg"></img>
            </a>
            <div className="content">
                <a href="/" className="author">
                    {props.sender}
                </a>
                <div className="metadata">
                    <span className="date">{props.time}</span>
                </div>
                <div className="text">{props.messageInfo}</div>
            </div>
        </div>
    );
};


export default Message;