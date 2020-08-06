import React, { Component } from "react";
import "./styles/message.css";
import axios from "axios";

class Message extends Component {
    constructor(props){
        super(props);

        this.state ={
            user: this.props.user,
            partner: this.props.partner,
            sender: this.props.sender,
            time: this.props.time,
            messageInfo: this.props.messageInfo,
            timeSec: undefined,
            timeMin: undefined,
            timeHour: undefined,
            date: undefined
        };
    };

    componentDidMount(){
        this.getTimeSince();
        this.getSender();
    };


    getTimeSince(){
        const milliseconds = Date.now() - new Date(this.props.time).getTime();
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds/60);
        const hours = Math.floor(minutes/60);
        if(hours > 24){
            this.setState({date: new Date(this.props.time).getDate()})
        } else if (hours > 0){
            this.setState({timeHour: hours})
        } else if (minutes > 0) {
            this.setState({timeMin: minutes});
        } else {
            this.setState({timeSec: seconds+1})
        };
        
    };

    getSender(){
        if(this.state.sender === this.state.user.partner_code){
            console.log("user sent")
            this.setState({sender: this.state.user.given_name})
        } else if (this.state.sender === this.state.partner.partner_code){
            console.log("partner sent")
            this.setState({sender: this.state.partner.given_name});
        };
    };

    render(){
        let timeMessage;
        if (this.state.date) timeMessage = <span className="date">{this.state.date}</span>;
        if (this.state.timeHour) timeMessage = <span className="date">{this.state.timeHour} hours ago</span>;
        if (this.state.timeMin) timeMessage = <span className="date">{this.state.timeMin} min ago</span>;
        if (this.state.timeSec) timeMessage = <span className="date">{this.state.timeSec} sec ago</span>;
        return(
            <div className="comment">
                <a className="avatar">
                    <img alt="avatar" src="https://semantic-ui.com/images/avatar/small/matt.jpg"></img>
                </a>
                <div className="content">
                    <a className="author">
                        {this.state.sender}
                    </a>
                    <div className="metadata">
                        {timeMessage}
                    </div>
                    <div className="text">{this.state.messageInfo}</div>
                </div>
            </div>
        );
    };
};


export default Message;