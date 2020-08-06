import React, { Component } from "react";
import axios from "axios";

class WriteText extends Component{
    constructor(props){
        super(props);
        this.state = {user: this.props.user, partner: this.props.partner, input: ""};

        this.messageRef = React.createRef();
    };
    

    handleChange(e){
        e.preventDefault();
        this.setState({input: e.target.value});
    };

    async handleSubmit(e){

        e.preventDefault();
        if(this.state.input.trim().length){
            const resultPost = await axios({
                method: "POST",
                url: "/api/messages",
                params: {
                    message: this.state.input
                }
            }).catch(err => console.error(err));
            if(resultPost.status !== 200) return console.error(resultPost.status);
            this.setState({input:""});
            console.log("success!");
        };
    };

    render(){
        return(
            <div className="ui segment">
                <form className="ui form">
                    <textarea id="message" name="message" value={this.state.input} onChange={e => this.handleChange(e)} ref={this.messageRef} placeholder="Write a message" style={{minHeight:"100%"}}></textarea>
                    <button onClick={(e) => this.handleSubmit(e)} className="ui button" type="submit">Send</button>
                </form>
            </div>
        );
    };
};


export default WriteText;