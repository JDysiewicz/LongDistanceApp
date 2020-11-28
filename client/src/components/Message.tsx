import React from "react"
import "./styles/message.css"

const Message = ({ user, partner, sender, time, messageInfo }: any) => {
  // Format the users messages
  if (user.nickname === sender) {
    const userImageSrc = user.avatar
      ? `${user.avatar}`
      : "https://semantic-ui.com/images/avatar/small/matt.jpg"
    return (
      <div className="comment user-comment">
        <div className="content user-content">
          <a href="/" className="author">
            {sender}
          </a>
          <div className="metadata">{time}</div>
          <div className="text user-text">{messageInfo}</div>
        </div>
        <a href="/" style={{ marginLeft: "15px" }} className="avatar user-avatar">
          <img alt="avatar" src={userImageSrc} />
        </a>
      </div>
    )
  }

  // Format the partners messages
  const partnerImageSrc = partner.avatar
    ? `${partner.avatar}`
    : "https://semantic-ui.com/images/avatar/small/matt.jpg"
  return (
    <div className="comment partner-comment">
      <a href="/" className="avatar partner-avatar">
        <img alt="avatar" src={partnerImageSrc} />
      </a>
      <div className="content partner-content">
        <a href="/" className="author">
          {sender}
        </a>
        <div className="metadata">{time}</div>
        <div className="text">{messageInfo}</div>
      </div>
    </div>
  )
}

export default Message
