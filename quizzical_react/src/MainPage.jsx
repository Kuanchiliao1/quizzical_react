import "./index.css"
import React from 'react'

export default function MainPage(props) {
  // question: checked?, correct answer, user answer
  const [answers, setAnswers] = React.useState([
    {

    }
  ])

  // New problem: form with ONLY 4 selections
  // Choices: A B C D
    // User choose C but the answer is D
  const [formData, setFormData] = React.useState(
      props.questions.reduce((object, questionData, index) => {
        let formId = index + 1
        object[formId] = {
          correct: findCorrectChoice(questionData),
          checkedChoice: 0
        }
        return object
      }, {})
    )
  console.log(formData)

  function handleEvent(event) {
    const {value, dataset} = event.target
    const formId = dataset.formId
    setFormData(function(oldFormData) {
      return {
        ...oldFormData,
        [formId]: {
          correct: oldFormData[formId].correct,
          checkedChoice: value
        },
      }
    })
  }

  // setFormData(function(oldForm) {
  //   event.target
  //   return {
  //     ...oldForm,

      
  //   }
  // })

  // returns 1-4 to represent correct choice
  function findCorrectChoice(questionData) {
    return questionData.choices.findIndex(choice => choice.correct) + 1
  }


/*
  ***Problem***
    - Description:
    - Input: varying number of multiple choice questions
      - 4 options each
    - Output: the incorrect guess made by the user and the correct answer
      -
    - Questions
      - How do I uniquely identify each question? => with index + form id for the question

  ***Data Structure***
    - its an array of objects
      - each object represents question - questionId {correct: 1-4, checked: 1-4}
    - input attributes - name: choice, value: 1-4, class: choice-#
  ***Algorithm***
    - Iterate through 10 question objects
      -
      - 
    - onChange: when the form value changes
      - Set the state to reflect the change
        - 
      - use that state to set the value in the form

  */


  const questionElements = props.questions.map((questionData, index) => {
    const {question, choices} = questionData
    const formId = index + 1
    return (
      <form id={formId} className="question-container">
        <h2>{question}</h2>
        <label>
          <input onClick={handleEvent} type="radio" name="choice" value="1" data-form-id={formId} id={`q${formId}choice1`} />
          {choices[0].text}
        </label>
        <label>
          <input onClick={handleEvent} type="radio" name="choice" value="2" data-form-id={formId} />
          {choices[1].text}
        </label>
        <label>
          <input onClick={handleEvent} type="radio" name="choice" value="3" data-form-id={formId} />
          {choices[2].text}
        </label>
        <label>
          <input onClick={handleEvent} type="radio" name="choice" value="4" data-form-id={formId} />
          {choices[3].text}
        </label>
      </form>
    )
  })

  return (
    <div>
      {questionElements}
      <h1></h1>
    </div>
  )
}