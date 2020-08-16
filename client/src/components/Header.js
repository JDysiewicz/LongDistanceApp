import React from "react";
import "./styles/header.css";
import LogoutButton from "./LogoutButton.js";
import DepartnerButton from "./DepartnerButton.js";

const Header = (props) => {
    return(
        <div className="header-home ui">
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