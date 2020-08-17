import React from "react";


const Greeting = (props) => {
    // Format partner code for display
    let partnerCode = props.user.partner_code.split("-").join("");
    return (
        <div className = "ui segment">
                <span style={{color:"black", fontSize: "xx-large"}}>Hello {props.user.given_name}, your partner code is: {partnerCode}</span>
        </div>
    );
};


export default Greeting;

