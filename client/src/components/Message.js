import React, { useState, useEffect } from "react";
import "./styles/message.css";

const Message = ({user, partner, sender, time, messageInfo}) =>{
    if(user.nickname === sender){
        const userImageSrc = user.avatar ? `${process.env.PUBLIC_URL}/images/${user.avatar}` : "https://semantic-ui.com/images/avatar/small/matt.jpg";
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
                <img alt="avatar" src={userImageSrc}></img>
            </a>
            </div>
        );    
    };

    const partnerImageSrc = partner.avatar ? `${process.env.PUBLIC_URL}/images/${partner.avatar}` : "https://semantic-ui.com/images/avatar/small/matt.jpg";
    return(
        <div className="comment partner-comment">
            <a className="avatar partner-avatar">
                <img alt="avatar" src={partnerImageSrc}></img>
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