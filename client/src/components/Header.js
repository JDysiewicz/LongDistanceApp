import React from "react";
import "./styles/header.css";
import LogoutButton from "./LogoutButton.js";
import DepartnerButton from "./DepartnerButton.js";

const Header = (props) => {
    return(
        <div className="header-home">

            <div className="user-partner-info">
                <div className="header-profile-h1">
                    <h1>User: {props.user.given_name} {props.user.family_name}</h1>
                    <h3>Your nickname: {props.user.nickname}</h3>
                </div>

                <div className="header-partner-h1">
                    <h1>Partner: {props.partner.given_name} {props.partner.family_name}</h1>
                    <h3>Partner nickname: {props.partner.nickname}</h3>
                </div>
            </div>

            <div className="header-logo">
                <h1>LDR</h1>
            </div>
            
            <div className="header-log-buttons">
                <DepartnerButton />
                <LogoutButton />
            </div>
        </div>
    );
};


export default Header;