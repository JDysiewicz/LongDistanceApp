import React, { useState } from "react"
import "./styles/textheader.css"

const TextHeader = (props: any) => {
  const [partner] = useState(props.partner)
  const [partnerOnlineStatus, setPartnerOnlineStatus] = useState(false)
  const [socket] = useState(props.socket)
  const avatarSrc = partner.avatar
    ? `${partner.avatar}`
    : "https://semantic-ui.com/images/avatar/small/matt.jpg"

  socket.on("partnersOnline", ({ status }: any) => {
    if (status === true) setPartnerOnlineStatus(true)
    if (status === false) setPartnerOnlineStatus(false)
  })

  return (
    <div className="textheader-main-body background-splash">
      <div className="textheader-nickanme">
        <h2>Chat with {partner.nickname}</h2>

        <div className="online-status">
          {partnerOnlineStatus ? (
            <span className="status online">ONLINE!!!</span>
          ) : (
            <span className="status offline">Offline :(</span>
          )}
        </div>
      </div>
      <div className="ui tiny circular image textheader-pp">
        <img alt="Profile pictures" src={avatarSrc} />
      </div>
    </div>
  )
}

export default TextHeader
