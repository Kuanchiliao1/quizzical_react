// TODO: Import Router components
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import React from "react";
import "./index.css";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import SavedQuestionsPage from "./components/SavedQuestionsPage";

function App() {
  const [customQuizTopic, setCustomQuizTopic] = React.useState("");
  const [storedQuizData, setStoredQuizData] = React.useState({
    questionsCorrect: 0,
    questionsTotal: 0,
    savedQuestions: [],
  });
  const navigate = useNavigate();

  function startQuiz() {
    navigate("/main-questions");
  }

  function endQuiz() {
    navigate("/");
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

  return (
    <div className="App">
      {
        <Routes>
          <Route
            path="/"
            element={
              <StartPage
                start={startQuiz}
                setStoredQuizData={setStoredQuizData}
                storedQuizData={storedQuizData}
                setCustomQuizTopic={setCustomQuizTopic}
                customQuizTopic={customQuizTopic}
              />
            }
          ></Route>
          <Route
            path="/main-questions"
            element={
              <MainPage
                end={endQuiz}
                customQuizTopic={customQuizTopic}
                setStoredQuizData={setStoredQuizData}
                storedQuizData={storedQuizData}
              />
            }
          ></Route>
          <Route
            path="/saved-questions"
            element={
              <SavedQuestionsPage
                storedQuizData={storedQuizData}
                setStoredQuizData={setStoredQuizData}
                handleViewSavedBtn={() => navigate('/')}
              />
            }
          ></Route>
        </Routes>
      }
    </div>
  );
}

export default App;
