import "../index.css";
import React from "react";

export default function QuestionElements(props) {
  if (props.questions && props.allFormData) {
    return props.questions.map((questionData, index) => {
      const { question, choices } = questionData;
      const formId = (index + 1).toString();
      const selectedChoiceNum = props.allFormData[formId].checkedChoice;
      const correctChoiceNum = props.allFormData[formId].correct;
      const hasQuestionExplanation = !!props.questionExplanations[formId]
      const isWaitingForResponse = hasQuestionExplanation && props.questionExplanations[formId].waiting
      const isSaved = props.storedQuizData.savedQuestions.some(form => {
        return question === form.questionText
      })
  
      const formInputs = choices.map((choice, index) => {
        const choiceId = (index + 1).toString();
        const isSelected = selectedChoiceNum === choiceId ? true : false;
  
        const correctAnswerClass =
          props.isQuizSubmitted && correctChoiceNum === choiceId
            ? "show-correct-choice"
            : "";
        const submittedClass = props.isQuizSubmitted ? "submitted" : "";
        const disabledClass = 
          !correctAnswerClass && !isSelected ? "disable" : ""
        const choiceElement = (
          <div key={`form${formId}question${choiceId}`}>
            <label className={`${correctAnswerClass} ${submittedClass} ${disabledClass}`}>
              <input
                onChange={props.handleChoiceSelection}
                type="radio"
                name="choice"
                value={choiceId}
                data-form-id={formId}
                checked={isSelected}
              />
              {choice.text}
            </label>
          </div>
        )
        return choiceElement
      })

      return (
        <>
          <form id={formId} className="question-container">
            <h2>{question}</h2>
            <div className="choices-container">{formInputs}</div>
            <div className="explanation-btn-container">
              {props.isQuizSubmitted &&
              <button
                className="ai-explaination"
                onClick={() => props.handleExplanationBtn(formId, question)}
                type="button"
                tabIndex="1"
                disabled={
                  hasQuestionExplanation
                  && props.questionExplanations[formId].isBtnDisabled
                }
                >
                  Generate explanation
              </button>}
              {props.isQuizSubmitted && 
              <button
                className="save-question"
                onClick={() => {
                  props.handleSaveBtn(formId)
                }}
                type="button"
                disabled={isSaved}
                >
                  {isSaved ? "✅ Saved" : "Save"}
              </button>}
            </div>
            <p>
              {(props.isQuizSubmitted && hasQuestionExplanation) && props.questionExplanations[formId].response}
              {isWaitingForResponse && <i  className="explanation-spinner fas fa-spinner fa-pulse"></i>}
            </p>
          </form>
        </>
      );
    });
  }
}