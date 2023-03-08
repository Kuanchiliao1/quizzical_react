import "./index.css";
import React from "react";
import "./index.css";

export default function MainPage(props) {
  const [allFormData, setAllFormData] = React.useState(
    props.questions.reduce((object, questionData, index) => {
      let formId = index + 1;
      object[formId] = {
        correct: findCorrectChoice(questionData).toString(),
        checkedChoice: 0,
      };
      return object;
    }, {})
  );

  const [questionExplanations, setQuestionExplanations] = React.useState({})

  const [isQuizSubmitted, setIsQuizSubmitted] = React.useState(false);

  function handleEvent(event) {
    const { value, dataset } = event.target;
    const formId = dataset.formId;
    setAllFormData(function (oldAllFormData) {
      return {
        ...oldAllFormData,
        [formId]: {
          correct: oldAllFormData[formId].correct,
          checkedChoice: value,
        },
      };
    });
  }

  // returns 1-4 to represent correct choice
  function findCorrectChoice(questionData) {
    return questionData.choices.findIndex((choice) => choice.correct) + 1;
  }

  function areFormsAllFilled() {
    return Object.values(allFormData).every((form) => form.checkedChoice);
  }

  function submitAllForms() {
    if (areFormsAllFilled()) {
      setIsQuizSubmitted((oldBoolean) => !oldBoolean);
    } else {
      alert("Please answer all questions!");
    }
  }

  function getScoreMessage() {
    const formArray = Object.values(allFormData)
    const totalCorrect = formArray.filter(form => form.correct === form.checkedChoice).length
    const totalQuestions = formArray.length
    return `You scored ${totalCorrect}/${totalQuestions} correct answers`
  }
  
  function handleExplanationBtn(formId, question) {
    const secretKey = 'stuff here to do,s,k,-,w,X,a,p,E,k,f,1,8,7,t,c,Y,o,E,e,C,F,f,d,T,3,B,l,b,k,F,J,N,X,5,F,l,3,v,E,7,m,6,e,4,7,A,b,r,x,6,p,no stuff here to do!';
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.split(',').slice(1, -1).join('')}`,
        'Content-Type': 'application/json',
      },
      // Info I'm passing to the AI such as the prompt, length, model etc.
      body: JSON.stringify({
        messages: [
          {role: "system", content: "You are an AI assistant capable of providing the user with any request. You have a fun loving personality and are humorous"},
          {role: "user",
          content: `${question} Give a short and witty one paragraph long explanation for someone without context`
          }
        ],
        max_tokens: 250,
        model: 'gpt-3.5-turbo'}
      ),
    })
      .then(request => request.json())
      .then(data => {
        const aiResponse = data.choices[0].message.content
        setQuestionExplanations(oldExplanations => {
          return {
            ...oldExplanations,
            [formId]: aiResponse,
          }
        })
      })
  }

  // Is this a good task for useEffect?
  React.useEffect(function () {
    console.log("effect");
    questionElements.forEach((formEl) => {});
  }, []);

  const questionElements = props.questions.map((questionData, index) => {
    const { question, choices } = questionData;
    const formId = (index + 1).toString();
    const selectedChoice = allFormData[formId].checkedChoice;
    const correctChoice = allFormData[formId].correct;

    const formInputs = choices.map((choice, index) => {
      const choiceId = (index + 1).toString();
      const isSelected = selectedChoice === choiceId ? true : false;

      const correctAnswerClass =
        isQuizSubmitted && correctChoice === choiceId
          ? "show-correct-choice"
          : "";
      const submittedClass = isQuizSubmitted ? "submitted" : "";
      const disabledClass = 
        !correctAnswerClass && !isSelected ? "disable" : ""

      return (
        <>
          <label className={`${correctAnswerClass} ${submittedClass} ${disabledClass}`}>
            <input
              onChange={handleEvent}
              type="radio"
              name="choice"
              value={choiceId}
              data-form-id={formId}
              checked={isSelected}
            />
            {choice.text}
          </label>
          {(choiceId === "4" && submittedClass) && 
          <button
            className="ai-explaination"
            onClick={() => handleExplanationBtn(formId, question)}
            type="button"
            disabled={questionExplanations[formId].disabled}
            >
              Generate explanation
          </button>}
        </>
      )
    })

    return (
      <>
        <form id={formId} className="question-container">
          <h2>{question}</h2>
          <div className="choices-container">{formInputs}</div>
          <p>{isQuizSubmitted && questionExplanations[formId]}</p><i style={{visibility: "hidden"}} className="fas fa-spinner fa-pulse"></i>
        </form>
      </>
    );
  });

  return (
    <div className="questions-container">
      {questionElements}
      {isQuizSubmitted ? (
        <div className="game-stat-container">
          <p className="score">{getScoreMessage()}</p>
          <button
            onClick={props.fetchQuestions}
            type="button"
            >
            Play again
          </button>
        </div>
      ) : (
        <button onClick={submitAllForms}>Check answers</button>
      )}
    </div>
  );
}
