import React, { useState, useEffect } from "react";
import "./styles/message.css";

const Message = ({sender, time, messageInfo}) =>{
    return(
        <div className="comment">
            <a className="avatar">
                <img alt="avatar" src="https://semantic-ui.com/images/avatar/small/matt.jpg"></img>
            </a>
            <div className="content">
                <a className="author">
                    {sender}
                </a>
                <div className="metadata">
                    {time}
                </div>
                <div className="text">{messageInfo}</div>
            </div>
        </div>
    );
};


export default Message;