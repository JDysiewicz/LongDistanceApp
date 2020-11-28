import React, { useRef } from "react"

const WriteText = (props: any) => {
  const textInput = useRef(null)
  return (
    <div>
      <form className="ui form">
        <textarea
          rows={3}
          ref={textInput}
          id="message"
          name="message"
          value={props.message}
          onChange={(e) => props.setMessage(e.target.value)}
          placeholder="Write a message"
          style={{ minHeight: "100%" }}
        />
        <button
          onClick={(e) => props.sendMessage(e, textInput.current)}
          className="ui button"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default WriteText
