import { useState } from "react";
import React from "react";
import "./index.css";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import getAIOutput from "./utils";

function App() {
  const [start, setStart] = React.useState(false);

  function startQuiz() {
    setStart(true);
  }

  function endQuiz() {
    setStart(false)
  }

  return (
    <div className="App">
      {start ? (
        <MainPage end={endQuiz} />
      ) : (
        <StartPage start={startQuiz} />
      )}
    </div>
  );
}

export default App;