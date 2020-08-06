import React, { Component } from "react";
import "./styles/messagelist.css";
import Message from "./Message.js";
import axios from "axios";

class MessageList extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            partner: this.props.partner,
            messageList: []
        };
    };


    componentDidMount(){
        axios.get("/api/messages")
         .then(res => this.setState({messageList: res.data}))
          .catch(err => console.error(err));
    };

    componentDidUpdate(){
        axios.get("/api/messages")
         .then(res => {
             this.setState({messageList: res.data});
            })
         .catch(err => console.error(err));
    };

    render(){
        return(
            <div className="messagelist-body-main">
                <div className="ui segment messagelist-body-list" >
                    <ul className="message-list ui comments" ref={this.scrollRef} >
                        {
                            this.state.messageList.map(msg => {
                                return (
                                    <Message
                                        user = {this.props.user}
                                        partner = {this.props.partner}
                                        key={msg.id}
                                        sender={msg.sender_partner_code}
                                        time={msg.time_sent}
                                        messageInfo={msg.message} />
                                    )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    };
};


export default MessageList;