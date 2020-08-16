import React, { useState, useEffect } from "react";
import "./styles/textheader.css";

const TextHeader = (props) => {
    const [user, setUser] = useState(props.user);
    const [partner, setPartner] = useState(props.partner);
    const [partnerOnlineStatus, setPartnerOnlineStatus] = useState(false);
    const [socket, setSocket] = useState(props.socket)


    // useEffect( () => {

    //     setInterval( () => {
    //         socket.emit("checkOnline", {partner: partner, currentStatus: partnerOnlineStatus});
    //     }, 1000);

    //     return(
    //         clearInterval()
    //     )
    // }, []);

    socket.on("partnersOnline", ({status}) => {
        if (status === true) setPartnerOnlineStatus(true);
        if (status === false) setPartnerOnlineStatus(false)
        
    });

    return(
        <div className="textheader-main-body background-splash">
        
                <div className="textheader-nickanme">
                    <h2>Chat with {partner.nickname}</h2>
                    
                    <div className="online-status">
                        {
                            partnerOnlineStatus ?
                            <span className="status online">ONLINE!!!</span> :
                            <span className="status offline">Offline :(</span>
                        }
                </div>

                </div>

            <div className="ui tiny circular image textheader-pp">
                <img alt="Profile pictures" src="https://images.unsplash.com/photo-1559310589-2673bfe16970?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE1NDU3Nn0" />
            </div>


        </div>
    );
};


export default TextHeader;