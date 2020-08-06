import React, { Component } from "react";
import "./styles/textheader.css";

class TextHeader extends Component{
    state = {
        user: this.props.user,
        partner: this.props.partner,
        partnerNickName: this.props.partner.given_name,
        backgroundSplash: undefined,
        partnerPP: "partnerPP",
        partnerOnlineStatus: "partnerOnlineStatus"
    };

    render(){
        return(
            <div className="textheader-main-body background-splash">

                <div className="textheader-nickanme-online">

                    <div className="textheader-nickanme">
                        {this.state.partner.given_name}
                    </div>

                    <div className="textheader-online">
                        {this.state.partnerOnlineStatus}
                    </div>
                    
                </div>

                <div className="ui tiny circular image textheader-pp">
                    <img alt="Profile pictures" src="https://images.unsplash.com/photo-1559310589-2673bfe16970?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE1NDU3Nn0" />
                </div>


            </div>
        );
    };
};


export default TextHeader;