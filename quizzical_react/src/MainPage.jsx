import "./index.css"
import React from 'react'

export default function MainPage(props) {
  const [allFormData, setAllFormData] = React.useState(
      props.questions.reduce((object, questionData, index) => {
        let formId = index + 1
        object[formId] = {
          correct: findCorrectChoice(questionData),
          checkedChoice: 0
        }
        return object
      }, {})
    )
  console.log(allFormData)

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

/*
  ***Problem***
    - Description: When button is clicked, check if all questions have an answer. Only run function if so.
      - If so, then dynamically add "correct" classes to all the questions. Disable the button and any further input somehow.
      - If not, do nothing
    - Input: 
      -
    - Output:
      -
    - Questions

  ***Data Structure***
    -

  ***Algorithm***
    -

  */

  function areFormsAllFilled() {
    console.log(Object.values(allFormData))
    return Object.values(allFormData).every(form => form.checkedChoice )
  }

  function submitAllForms() {
    if (areFormsAllFilled()) {
      console.log("yep!")
    } else {
      console.log("nope!")
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
    const formId = index + 1
    const selectedValue = allFormData[formId].checkedChoice
    const formInputs = []
    
    for(let i = 0; i < choices.length; i++ ) {
      const value = String(i + 1)

      formInputs.push(
        <label>
          <input onChange={handleEvent} type="radio" name="choice" value={value} data-form-id={formId} checked={selectedValue === value ? true : false} />
          {choices[i].text}
        </label>
      )
    }

    return (
      <form id={formId} className="question-container">
        <h2>{question}</h2>
        {formInputs}
      </form>
    )
  })

  return (
    <div>
      {questionElements}
      <h1></h1>
      <button onClick={submitAllForms}>Submit</button>
    </div>
  )
}