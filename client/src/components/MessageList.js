import React, { useRef, useEffect } from "react";
import "./styles/messagelist.css";
import Message from "./Message.js";

const MessageList = (props) => {
    const scrollRef = useRef(null);

    useEffect( () => {
        props.scroll(scrollRef.current);
    }, [props.messages]);

    return(
            <div className="messagelist-body-main">
                <div className="ui segment messagelist-body-list" >
                    <div className="message-list ui comments">
                    
                        {
                            props.messages.map(msg => {
                                if(msg.admin){
                                    return (
                                        <div style={{textAlign: "center"}} className="admin-message-div">
                                            <span className="admin-message-content">Admin: {msg.message}</span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <Message
                                            key={msg.id ? msg.id : Math.random().toString() + new Date().toLocaleString("en-GB")}
                                            sender={msg.sender_partner_code === props.user.partner_code ? props.user.nickname : props.partner.nickname}
                                            time={msg.time_sent}
                                            user={props.user}
                                            partner={props.partner}
                                            messageInfo={msg.message} />
                                    )
                                }
                            })
                        }
                        <br></br>
                        <div className="scroll-to" ref={scrollRef}></div>
                    </div>
                </div>
            </div>
    );
};


export default MessageList;