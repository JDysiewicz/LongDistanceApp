import React from "react";
import TextChat from "./TextChat.js";
import "./styles/homebody.css";


const HomeBody = (props) => {
    return(
        <div className="home-body-container">
            <div className="ui segment home-textchat-container">
                <TextChat user={props.user} partner={props.partner}/>
            </div>

{/* 
Calendar HERE
*/}

        </div>
    );
};


export default HomeBody;