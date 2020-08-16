import React from "react";


const LogoutButton = () => {
    return (
        <form method="POST" action="/api/logout" className="ui form">
            <button className="ui button" type="submit">Logout</button>
        </form>
    );
};

export default LogoutButton;

