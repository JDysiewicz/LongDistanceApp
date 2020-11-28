import React from "react"
import "./styles/header.css"
import LogoutButton from "./LogoutButton"
import DepartnerButton from "./DepartnerButton"

const Header = () => {
  return (
    <div className="header-home ui">
      <div className="header-logo">
        <h1>LDR</h1>
      </div>

      <div className="header-log-buttons">
        <DepartnerButton />
        <LogoutButton />
      </div>
    </div>
  )
}

export default Header
