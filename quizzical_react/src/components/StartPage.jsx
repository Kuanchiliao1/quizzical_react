import "../index.css";
import React from "react";
import SavedQuestionsPage from "./SavedQuestionsPage.jsx";
import { fetchAIScoreFeedback } from "../utils";

export default function StartPage(props) {
  const [isReset, setIsReset] = React.useState(null);
  const [customScoreMessage, setCustomScoreMessage] = React.useState(null)
  const { questionsCorrect, questionsTotal } = props.storedQuizData;

  function handleInput(event) {
    props.setCustomQuizTopic((oldInput) => {
      return event.target.value;
    });
  }

  function handleOnKeyDown(event) {
    if (event.key === "Enter") {
      props.start();
    }
  }

  function handleResetBtn() {
    setIsReset(true);
    props.setStoredQuizData((oldScore) => {
      return {
        ...oldScore,
        questionsCorrect: 0,
        questionsTotal: 0,
        scoreFeedback: ""
      };
    });
  }

  function handleViewSavedBtn() {
    props.setViewSaved((oldValue) => !oldValue);
  }

  function getScoreMessage() {
    const { questionsCorrect, questionsTotal } = props.storedQuizData;
    if (questionsCorrect + questionsTotal === 0) {
      return "No score yet";
    } else {
      return `Total Score: ${questionsCorrect} out of ${questionsTotal}`;
    }
  }

  React.useEffect(() => {
    setCustomScoreMessage
    // fetchCustomScoreMessage()
  }, [questionsCorrect, questionsTotal])

  return props.viewSaved ? (
    <SavedQuestionsPage
      storedQuizData={props.storedQuizData}
      setStoredQuizData={props.setStoredQuizData}
      handleViewSavedBtn={handleViewSavedBtn}
    />
  ) : (
    <div className="start-page">
      <h1 className="title">🤖 Quizzical</h1>
      <p className="start-description">
        {props.storedQuizData.scoreFeedback || "Quiz on random topics or enter your own topic to generate a custom quiz!"}
        <span className="warning">
          ⚠️ Warning: AI questions and explanations may be *extremely*
          inaccurate
        </span>
      </p>
      <div className="quiz-components-container">
        <input
          className="custom-quiz"
          placeholder="(optional) e.g. Star Wars - hard"
          type="text"
          onChange={handleInput}
          onKeyDown={handleOnKeyDown}
          value={props.customQuizTopic}
        />
        <button className="start-quiz" onClick={props.start}>
          Start quiz!
        </button>
        <p className="score-message">{getScoreMessage()}</p>
        <div className="reset-save-btn-container">
          <button
            disabled={isReset || getScoreMessage() === "No score yet"}
            className="reset-score"
            onClick={handleResetBtn}
          >
            Reset
          </button>
          <button className="view-saved-questions" onClick={handleViewSavedBtn}>
            ⭐ Saved
          </button>
        </div>
      </div>
    </div>
  );
}
