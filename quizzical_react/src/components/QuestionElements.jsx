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
  
        return (
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
      })
  
      return (
        <>
          <form id={formId} className="question-container">
            <h2>{question}</h2>
            <div className="choices-container">{formInputs}</div>
            {props.isQuizSubmitted && 
            <button
              className="ai-explaination"
              onClick={() => props.handleExplanationBtn(formId, question)}
              type="button"
              disabled={
                hasQuestionExplanation
                && props.questionExplanations[formId].isBtnDisabled
              }
              >
                Generate explanation
            </button>}
            <p>
              {(props.isQuizSubmitted && hasQuestionExplanation) && props.questionExplanations[formId].response}
              {isWaitingForResponse && <i  className="fas fa-spinner fa-pulse"></i>}
            </p>
          </form>
        </>
      );
    });
  }
}