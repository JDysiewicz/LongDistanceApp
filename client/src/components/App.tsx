import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeUnlogged from "./HomeUnlogged";
import Home from "./Home";
import axios from "axios";


const App = () => {

    const [user, setUser] = useState(undefined);
    useEffect( () => {
        (async () => {
            let userCheck = await axios.get("/api/current_user").catch(err => console.error(err));
            if (userCheck) setUser(userCheck.data)
        })();
    }, []);

    // Return an empty div while fetching the user
    if(user === undefined) return <div></div>
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={HomeUnlogged} />
                    <Route exact path="/home" render={props => (<Home {...props} user={user} />)}/>
                </div>
            </BrowserRouter>
        </div>
    )
};


export default App;