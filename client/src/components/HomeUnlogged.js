import React, { useState, useEffect } from "react";
import axios from "axios";
import LoggedIn from "./LoggedIn.js";
import { Redirect } from "react-router";


const enterOAuth = (e) => {
    e.preventDefault();
    window.location.href = "/auth/google";

};

const HomeUnlogged =  () => {
    const [user, setUser] = useState(undefined);
    useEffect( () => {
        axios.get("/api/current_user")
         .then(res => setUser(res.data));
    }, []);


    if (!user){
        return (
            <div className = "ui active dimmer">
                <button onClick={e => enterOAuth(e)} className="ui button">Sign In With Google</button>
            </div>
        );

    } else if (user.has_partner === null){
        return(
            <LoggedIn user={this.state.user}/>
        );

    } else {
        return <Redirect to="/home" />
    };
};


export default HomeUnlogged;