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
      <h1 className="title">🤖 Quizzical</h1>
      <p className="start-description">
        Quiz on random topics or enter your own topic to generate a custom quiz!
        <span className="warning">⚠️ Warning: AI questions and explanations may be *extremely* inaccurate</span>
        <input className="custom-quiz" placeholder="(optional) e.g. Star Wars" type="text" onChange={handleInput} value={props.customQuizTopic} />
      </p>
      <button className="start-quiz" onClick={props.start}>Start general quiz</button>
    </div>
  )
}