import React, { Component } from "react";


class PendingRequest extends Component{
    state = {user: this.props.user};
    render(){
        return (
            <div className = "ui segment">
                    <span>Pending Response from {this.state.user.sent_request}...</span>
                    <form method="POST" action="/api/remove-request" className="ui form">
                        <button className="ui button" type="submit">Remove Request</button>
                    </form>
            </div>
        );
    };
};


export default PendingRequest;

