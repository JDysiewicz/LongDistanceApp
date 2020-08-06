import React, { Component } from "react";
import TextChat from "./TextChat.js";
import Calendar from "./Calendar.js";
import "./styles/homebody.css";

class HomeBody extends Component{
    state = {user: this.props.user, partner: this.props.partner};

    render(){
        return(
            <div className="home-body-container">
                <div className="ui segment home-textchat-container">
                    <TextChat user={this.state.user} partner={this.state.partner}/>
                </div>
{/* 
                <div className="ui segment home-calendar-container">
                    <Calendar user={this.state.user} partner={this.state.partner} />
                </div> */}
            </div>
        );
    };
};

export default HomeBody;