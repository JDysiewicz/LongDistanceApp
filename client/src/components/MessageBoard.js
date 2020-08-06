import React, { Component } from "react";
import MessageList from "./MessageList.js";

class MessageBoard extends Component{
    state = {user: this.props.user, partner: this.props.partner};

    render(){
        return(
            <div>
                <MessageList user={this.state.user} partner={this.state.partner} />
            </div>
        );
    };
};


export default MessageBoard;