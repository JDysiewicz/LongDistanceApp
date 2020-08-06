import React, { Component } from "react";
import Greeting from "./Greeting.js"
import SendRequest from "./SendRequest.js";
import PendingRequest from "./PendingRequest.js";
import HasRequest from "./HasRequest.js";
import LogoutButton from "./LogoutButton.js";


class LoggedIn extends Component{
    state = {user: this.props.user};
    render(){
        return(
            <div className="ui segment">
                <Greeting user={this.state.user} />
                <LogoutButton />

                {!this.state.user.sent_request &&
                    <SendRequest />
                }

                {this.state.user.sent_request &&
                    <PendingRequest user={this.state.user} />
                }

                {this.state.user.has_request &&
                    <HasRequest user={this.state.user} />
                }
            </div>
        );
    };

};


export default LoggedIn;