import React, { Component } from "react";
import TextHeader from "./TextHeader.js";
import MessageBoard from "./MessageBoard.js";
import WriteText from "./WriteText.js";


class TextChat extends Component{
    state = {user: this.props.user, partner: this.props.partner};

    render(){
        return(
            <div> 
                <TextHeader user={this.state.user} partner={this.state.partner} />
                <MessageBoard user={this.state.user} partner={this.state.partner} />
                <WriteText user={this.state.user} partner={this.state.partner} />
            </div>
        );
    };
};

export default TextChat;