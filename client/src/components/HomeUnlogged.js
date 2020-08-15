import React, { Component } from "react";
import axios from "axios";
import LoggedIn from "./LoggedIn.js";
import { Redirect } from "react-router";

const enterOAuth = (e) => {
    e.preventDefault();
    window.location.href = "/auth/google";

};

class HomeUnlogged extends Component {
    state = {user: null};

    componentDidMount(){
        axios.get("/api/current_user")
         .then(res => this.setState({user: res.data}))
    };

    render(){
        let returnedContent = undefined;
        if (!this.state.user){
            returnedContent =(
                <div className = "ui active dimmer">
                    <button onClick={e => enterOAuth(e)} className="ui button">Sign In With Google</button>
                </div>
            );
        } else if (this.state.user.has_partner === null){
            returnedContent = (
                <LoggedIn user={this.state.user}/>
            );
        } else {
            return <Redirect to="/home" />
        }
        return returnedContent;
    };
};


export default HomeUnlogged;