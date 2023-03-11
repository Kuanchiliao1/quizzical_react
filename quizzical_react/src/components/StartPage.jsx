import "../index.css"
import React from "react";
import { fetchAIScoreFeedback } from "../utils"

export default function StartPage(props) {
  function handleInput(event) {
    props.setCustomQuizTopic(oldInput => {
      return event.target.value
    })
  }

  function handleOnKeyDown(event) {
    if (event.key === "Enter") {
      props.start()
    }
  }

  function handleResetBtn() {
    props.setStoredQuizData(oldScore => {
      return ({
        ...oldScore,
        questionsCorrect: 0,
        questionsTotal: 0
      })
    })
  }

  function getScoreMessage() {
    return fetchAIScoreFeedback()
  }

  return (
    <div className="start-page">
      <h1 className="title">🤖 Quizzical</h1>
      <p className="start-description">
        Quiz on random topics or enter your own topic to generate a custom quiz!
        <span className="warning">⚠️ Warning: AI questions and explanations may be *extremely* inaccurate</span>
        <input className="custom-quiz" placeholder="(optional) e.g. Star Wars" type="text" onChange={handleInput} onKeyDown={handleOnKeyDown} value={props.customQuizTopic} />
      </p>
      <button className="start-quiz" onClick={props.start}>Start general quiz</button>
      <button className="reset-score" onClick={handleResetBtn}>Reset Score</button>
      <p className="score-message">{getScoreMessage()}</p>
    </div>
  )
}