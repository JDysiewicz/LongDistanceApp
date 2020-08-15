import React, { useState, useEffect, useRef } from "react";

const WriteText = (props) => {
    const textInput = useRef(null);
    return(
        <div className="ui segment">
            <form className="ui form">
                <textarea ref={textInput} id="message" name="message" value={props.message} onChange={(e) => props.setMessage(e.target.value)} placeholder="Write a message" style={{minHeight:"100%"}}></textarea>
                <button onClick={(e) => props.sendMessage(e, textInput.current)} className="ui button" type="submit">Send</button>
            </form>
        </div>
    );

};


export default WriteText;