import React, { Component } from "react";


class SendRequest extends Component{
    state = {user: this.props.user, inputText: ""};

    handleChange(e){
        this.setState({inputText: e.target.value});
    };
    render(){
        return (
            <div className = "ui segment">
                    <span>To partner up, please send a request to your partner's Partner Code:</span>
                    <form method="POST" action="/api/send-request" className="ui form">
                        <label>Partner's Code (Do not include dashes):</label>
                        <input onChange={(e) => this.handleChange(e)} type="number" id="partnerscode" name="partnerscode" value={this.state.inputText}/>
                        <button type="submit" className="ui button">Send Request!</button>
                    </form>
            </div>
        );
    };
};


export default SendRequest;

