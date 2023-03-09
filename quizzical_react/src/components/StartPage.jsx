import "../index.css"
import React from "react";

export default function StartPage(props) {
  function handleInput(event) {
    console.log(event.target.value)
    props.setCustomQuizTopic(oldInput => {
      return event.target.value
    })
  }

  return (
    <div className="start-page">
      <h1 className="title">Quizzical 🤖</h1>
      <p className="start-description">
        Take a 4 question quiz on a random topic or enter your own to generate a custom quiz!
        <span className="warning">⚠️ Warning: AI output may be inaccurate</span>
        <input type="text" onChange={handleInput} value={props.customQuizTopic} />
      </p>
      <button onClick={props.start}>Start quiz</button>
    </div>
  )
}