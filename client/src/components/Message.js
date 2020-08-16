import React, { useState, useEffect } from "react";
import "./styles/message.css";

const Message = ({user, sender, time, messageInfo}) =>{
    if(user.nickname === sender){
        return (
            <div className="comment user-comment">
                <div className="content user-content">
                    <a className="author">
                        {sender}
                    </a>
                    <div className="metadata">
                        {time}
                    </div>
                    <div className="text user-text">{messageInfo}</div>
                </div>
            <a style={{marginLeft: "15px"}} className="avatar user-avatar">
                <img alt="avatar" src="https://semantic-ui.com/images/avatar/small/matt.jpg"></img>
            </a>
            </div>
        );    
    };

    return(
        <div className="comment partner-comment">
            <a className="avatar partner-avatar">
                <img alt="avatar" src="https://semantic-ui.com/images/avatar/small/matt.jpg"></img>
            </a>
            <div className="content partner-content">
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