import React, { Component } from "react";


class HasRequest extends Component{
    state = {user: this.props.user};

    render(){
        return (
            <div className = "ui segment">
                    <span>Request From: {this.state.user.has_request}</span>
                    <form method="POST" action="/api/partner-up" className="ui form">
                        <button className="ui button" type="submit">Accept</button>
                    </form>
                    <br></br>
                    <form method="POST" action="/api/decline-request" className="ui form">
                    <button className="ui button" type="submit">Decline</button>
                    </form>
            </div>
        );
    };
};


export default HasRequest;

