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
                    <ul className="message-list ui comments">
                    
                        {
                            props.messages.map(msg => {
                                return (
                                    <Message
                                        key={msg.id ? msg.id : Math.random().toString() + new Date().toLocaleString("en-GB")}
                                        sender={msg.sender_partner_code === props.user.partner_code ? props.user.given_name : props.partner.given_name}
                                        time={msg.time_sent}
                                        messageInfo={msg.message} />
                                    )
                            })
                        }
                        <br></br>
                        <div className="scroll-to" ref={scrollRef}></div>
                    </ul>
                </div>
            </div>
    );
};


export default MessageList;