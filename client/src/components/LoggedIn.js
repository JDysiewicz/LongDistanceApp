import React from "react";
import Greeting from "./Greeting.js"
import SendRequest from "./SendRequest.js";
import PendingRequest from "./PendingRequest.js";
import HasRequest from "./HasRequest.js";
import LogoutButton from "./LogoutButton.js";


const LoggedIn = (props) => {
    return(
        <div className="ui segment">
            <Greeting user={props.user} />
            <LogoutButton />

            {!props.user.sent_request &&
                <SendRequest />
            }
            {props.user.sent_request &&
                <PendingRequest user={props.user} />
            }
            {props.user.has_request &&
                <HasRequest user={props.user} />
            }
            
        </div>
    );
};


export default LoggedIn;