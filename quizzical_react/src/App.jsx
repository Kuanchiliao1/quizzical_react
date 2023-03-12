import { useState } from "react";
import React from "react";
import "./index.css";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";

function App() {
  const [start, setStart] = React.useState(false);
  const [viewSaved, setViewSaved] = React.useState(false);
  const [customQuizTopic, setCustomQuizTopic] = React.useState("")
  const [storedQuizData, setStoredQuizData] = React.useState({
    questionsCorrect: 0,
    questionsTotal: 0,
    savedQuestions: []
  })

  function startQuiz() {
    setStart(true);
  }

  function endQuiz() {
    setStart(false)
  }

  React.useEffect(() => {
    const data = window.localStorage.getItem("saved-quiz-information")
    if ( data !== null) setStoredQuizData(JSON.parse(data))
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem("saved-quiz-information", JSON.stringify(storedQuizData))
  }, [storedQuizData])

  const mainPage = <MainPage end={endQuiz} customQuizTopic={customQuizTopic} setStoredQuizData={setStoredQuizData} storedQuizData={storedQuizData} />
  
  const startPage = <StartPage start={startQuiz} setStoredQuizData={setStoredQuizData} storedQuizData={storedQuizData} setCustomQuizTopic={setCustomQuizTopic} customQuizTopic={customQuizTopic} setViewSaved={setViewSaved} viewSaved={viewSaved}/>

  return (
    <div className="App">
      {
        start ? (
          mainPage
        ) : (
          startPage
      )}
    </div>
  );
}

export default App;