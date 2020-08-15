import React, { Component } from "react";


class Greeting extends Component{
    state = {user: this.props.user};
    render(){
        let partnerCode = this.state.user.partner_code;
        partnerCode = partnerCode.split("-").join("");
        return (
            <div className = "ui segment">
                    <span style={{color:"black", fontSize: "xx-large"}}>Hello {this.state.user.given_name}, your partner code is: {partnerCode}</span>
            </div>
        );
    };
};


export default Greeting;

