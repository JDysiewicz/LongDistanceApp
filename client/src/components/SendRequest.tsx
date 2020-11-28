import React, { useState } from "react";


const SendRequest = () => {
    const [inputText, setInputText] = useState("");

    return (
        <div className = "ui segment">
                <span>To partner up, please send a request to your partner's Partner Code:</span>
                <form method="POST" action="/api/send-request" className="ui form">
                    <label>Partner's Code (Do not include dashes):</label>
                    <input onChange={(e) => setInputText(e.target.value)} type="number" id="partnerscode" name="partnerscode" value={inputText}/>
                    <button type="submit" className="ui button">Send Request!</button>
                </form>
        </div>
    );
};


export default SendRequest;

