// TODO: Import Router components
import React from "react";
import "./index.css";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";

function App() {
  // TODO: Remove this state
  const [start, setStart] = React.useState(false);
  // TODO: Remove this state
  const [viewSaved, setViewSaved] = React.useState(false);
  const [customQuizTopic, setCustomQuizTopic] = React.useState("");
  const [storedQuizData, setStoredQuizData] = React.useState({
    questionsCorrect: 0,
    questionsTotal: 0,
    savedQuestions: [],
  });

  // TODO: Use navigator instead of state here
  function startQuiz() {
    setStart(true);
  }

  function endQuiz() {
    setStart(false);
  }

  React.useEffect(() => {
    const data = window.localStorage.getItem("saved-quiz-information");
    if (data !== null) setStoredQuizData(JSON.parse(data));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(
      "saved-quiz-information",
      JSON.stringify(storedQuizData)
    );
  }, [storedQuizData]);

  const mainPage = (
    <MainPage
      end={endQuiz}
      customQuizTopic={customQuizTopic}
      setStoredQuizData={setStoredQuizData}
      storedQuizData={storedQuizData}
    />
  );

  const startPage = (
    <StartPage
      start={startQuiz}
      setStoredQuizData={setStoredQuizData}
      storedQuizData={storedQuizData}
      setCustomQuizTopic={setCustomQuizTopic}
      customQuizTopic={customQuizTopic}
      setViewSaved={setViewSaved}
      viewSaved={viewSaved}
    />
  );

  return (
    <div className="App">
      {
        // TODO: Replace and add router and routes here
      }
      {start ? mainPage : startPage}
    </div>
  );
}

export default App;
