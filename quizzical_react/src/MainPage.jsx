import "./index.css"
import React from 'react'
import './index.css'

export default function MainPage(props) {
  const [allFormData, setAllFormData] = React.useState(
      props.questions.reduce((object, questionData, index) => {
        let formId = index + 1
        object[formId] = {
          correct: findCorrectChoice(questionData).toString(),
          checkedChoice: 0
        }
        return object
      }, {})
    )
  
  const [isQuizSubmitted, setIsQuizSubmitted] = React.useState(false)

  function handleEvent(event) {
    const {value, dataset} = event.target
    const formId = dataset.formId
    setAllFormData(function(oldAllFormData) {
      return {
        ...oldAllFormData,
        [formId]: {
          correct: oldAllFormData[formId].correct,
          checkedChoice: value
        },
      }
    })
  }

  // returns 1-4 to represent correct choice
  function findCorrectChoice(questionData) {
    return questionData.choices.findIndex(choice => choice.correct) + 1
  }

  function areFormsAllFilled() {
    console.log(Object.values(allFormData))
    return Object.values(allFormData).every(form => form.checkedChoice )
  }

  function submitAllForms() {
    if (areFormsAllFilled()) {
      setIsQuizSubmitted(oldBoolean => !oldBoolean)
      console.log(isQuizSubmitted)
    } else {
      alert("Please answer all questions!")
    }
  }

  // Is this a good task for useEffect?
  React.useEffect(function() {
    console.log("effect")
    questionElements.forEach(formEl => {
    })
  }, [])

  const questionElements = props.questions.map((questionData, index) => {
    const {question, choices} = questionData
    const formId = (index + 1).toString()
    const selectedChoice = allFormData[formId].checkedChoice
    const correctChoice = allFormData[formId].correct
    const formInputs = []
    
    for(let i = 0; i < choices.length; i++ ) {
      const choiceId = (i + 1).toString()
      const isSelected = selectedChoice === choiceId ? true : false

      const correctClass = (isQuizSubmitted && (correctChoice === choiceId)) ? "show-correct-choice" : ""
      const submittedClass = isQuizSubmitted ? "submitted" : ""
      
      formInputs.push(
        <label className={`${correctClass} ${submittedClass}`}>
          <input onChange={handleEvent} type="radio" name="choice" value={choiceId} data-form-id={formId} checked={isSelected} />
          {choices[i].text}
        </label>
      )
    }

    return (
      <>
        <form id={formId} className="question-container">
          <h2>{question}</h2>
          <div className="choices-container">{formInputs}</div>
        </form>
      </>
    )
  })

  return (
    <div className="questions-container">
      {questionElements}
      <h1></h1>
      {isQuizSubmitted ? <p>Other thing</p> : <button onClick={submitAllForms}>Check answers</button>}
    </div>
  )
}