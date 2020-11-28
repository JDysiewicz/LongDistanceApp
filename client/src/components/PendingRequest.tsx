import React from "react"

const PendingRequest = (props: any) => {
  return (
    <div className="ui segment">
      <span>Pending Response from {props.user.sent_request}...</span>
      <form method="POST" action="/api/remove-request" className="ui form">
        <button className="ui button" type="submit">
          Remove Request
        </button>
      </form>
    </div>
  )
}

export default PendingRequest
