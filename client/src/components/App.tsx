import React, { useState, useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import HomeUnlogged from "./HomeUnlogged"
import Home from "./Home"
import axios from "axios"

import { User } from "../types"

import UserContext from "../UserContext"

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined)
  useEffect(() => {
    ;(async () => {
      const userCheck = await axios.get("/api/current_user").catch((err) => console.log(err))
      if (userCheck) setUser(userCheck.data)
    })()
  }, [])

  // Return an empty div while fetching the user
  if (user === undefined) return <div />
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={HomeUnlogged} />
          <Route exact={true} path="/home" render={(props) => <Home {...props} user={user} />} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
