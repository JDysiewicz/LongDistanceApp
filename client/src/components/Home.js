import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "./Header.js";
import HomeBody from "./HomeBody.js";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {user: this.props.user, partner: null};
    };

    componentDidMount(){
        axios.get("/api/partner")
         .then(res => this.setState({partner: res.data}))
         .catch(err => console.error(err))
    };

    render(){
        if(!this.state.user.has_partner){
            return <Redirect to="/" />;
        } else if(this.state.partner === null){
            return <div></div>
        } else{
            return (
                <div style={{maxWidth:"100vw", maxHeight:"10vh"}}>
                    <Header user={this.state.user} partner={this.state.partner} />
                    <HomeBody user={this.state.user} partner={this.state.partner}/>
                </div>
            );
        }
    };
};

export default Home;