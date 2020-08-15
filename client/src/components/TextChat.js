// UNFINISHED HERE

import React, { useState, useEffect } from "react";
import TextHeader from "./TextHeader.js";
import MessageList from "./MessageList.js";
import WriteText from "./WriteText.js";
import io from "socket.io-client";
import axios from "axios";
import "../components/styles/textchat.css";
// Client side socket behaviour
const ENDPOINT = "limitless-sands-03990.herokuapp.com/";

let socket = io(ENDPOINT);




const TextChat = (props) => {
    const [user, setUser] = useState(props.user);
    const [partner, setPartner] = useState(props.partner)
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [activeUser] = useState({...props.user})
    const [activeUsers, setActiveUsers] = useState([]);



    // Socket initiation useEffect
    useEffect( () => {
        // Initiate Socket Handshake with server
        socket.emit("join", {user: user}, ({error}) => {
            if(error){
                alert("Already logged in to chat on another window!");
            };
        });

        axios.get("/api/messages")
         .then(res => setMessages([...res.data]))
         .catch(err => console.error(err));

        return () => {
            // Turn off the socket when user disconnects
            socket.emit("disconnect", activeUser);
            socket.off()
        };
    }, [ENDPOINT]);


    // Upon receiving a logged in/out message from the server - CONSOLE LOG FOR NOW, WANT SOME SORT OF ALERT FOR EVERYONE THAT PERSON WENT OFFLINE
    useEffect( () => {
        socket.on("loggedIn", ({text}) => {
            console.log(text)
        });

        socket.on("loggedOut", ({text}) => {
            console.log(text)
        });
        return () => {
            socket.off("loggedIn");
            socket.off("loggedOut");
        };
    });

    // Run whenever messages updated - if only run at setup will replace the messages array with a new message every time and not append it
    // Still not too sure on why it wouldnt work to add an event handler on the inital setup, then not update it until the page is reloaded - why is a new event handler needed every time to prevent the whole messages array reloading?
    useEffect( () =>{
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
        return () => {
            socket.off("message");
        };
    }, [messages]);

    const sendMessage = (e, target) => {
        e.preventDefault();
        if(message.trim()){
            socket.emit("sendMessage", {sender_partner_code: user.partner_code, recipient_partner_code: partner.partner_code, message: target.value, time_sent: new Date().toLocaleString("en-GB")});
            setMessage("");
        };
        
    };

    const scrollToBottom = (scrollRef) => {
        scrollRef.scrollIntoView();
    };

    const setNickname = (e, target) => {
        e.preventDefault();

    };

    return(
        <div className="main-content"> 
            <TextHeader user={user} partner={partner} />
            <MessageList user={user} partner={partner} messages={messages} scroll={(scrollRef) => scrollToBottom(scrollRef)}/>
            <WriteText user={user} partner={partner} message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
};

export default TextChat;