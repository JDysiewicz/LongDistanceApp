import React from "react"
import { User } from "../types"

interface GreetingProps {
  user: User
}

const Greeting: React.FC<GreetingProps> = (props: GreetingProps) => {
  // Format partner code for display
  const partnerCode = props.user.partner_code.split("-").join("")
  return (
    <div className="ui segment">
      <span style={{ color: "black", fontSize: "xx-large" }}>
        Hello {props.user.given_name}, your partner code is: {partnerCode}
      </span>
    </div>
  )
}

export default Greeting
