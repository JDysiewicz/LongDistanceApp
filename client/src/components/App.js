import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeUnlogged from "./HomeUnlogged.js";
import Home from "./Home.js";
import axios from "axios";


class App extends Component {
    state = {user: undefined};

    async componentDidMount(){
        let user = await axios.get("/api/current_user").catch(err => console.error(err));
        if (user) this.setState({user: user.data});
    };

    render(){
        if(this.state.user === undefined) return <div></div>
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={HomeUnlogged} />
                        <Route exact path="/home" render={props => (<Home {...props} user={this.state.user} />)}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};


export default App;