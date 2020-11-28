import React from "react"
import Greeting from "./Greeting"
import SendRequest from "./SendRequest"
import PendingRequest from "./PendingRequest"
import HasRequest from "./HasRequest"
import LogoutButton from "./LogoutButton"

const LoggedIn = (props: any) => {
  return (
    <div className="ui segment">
      <Greeting user={props.user} />
      <LogoutButton />

      {!props.user.sent_request && <SendRequest />}
      {props.user.sent_request && <PendingRequest user={props.user} />}
      {props.user.has_request && <HasRequest user={props.user} />}
    </div>
  )
}

export default LoggedIn
