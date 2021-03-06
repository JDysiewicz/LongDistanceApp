import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "./Header.js";
import HomeBody from "./HomeBody.js";

const Home = (props) => {
    const [partner, setPartner] = useState(null);

    useEffect( () => {
        axios.get("/api/partner")
         .then(res => setPartner(res.data))
         .catch(err => console.error(err))
    }, []);

    if(!props.user.has_partner){
        // Home is a private route only if partnered
        return <Redirect to="/" />;

    } else if(partner === null){
        // Return plain div when fetching partner info
        return <div></div>
        
    } else{
        return (
            <div style={{maxWidth:"100vw", maxHeight:"10vh"}}>
                <Header user={props.user} partner={partner} />
                <HomeBody user={props.user} partner={partner}/>
            </div>
        );
    };
};


export default Home;