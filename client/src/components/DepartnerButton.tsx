import React from "react";


const DepartnerButton = () => {
    return (
        <form method="POST" action="/api/departner" className="ui form">
            <button className="ui button" type="submit">De-Partner</button>
        </form>
    );
};


export default DepartnerButton;