import "./index.css"

export default function MainPage(props) {
  const questionElements = props.questions.map((questionData, index) => {
    const {question, choices} = questionData
    return (
      <form id={`group-${index}`} className="question-container">
        <h2>{question}</h2>
        <label htmlFor="choice-one">{choices[0].text}</label>
          <input type="radio" name="choice" id="choice-one" />
        <label htmlFor="choice-two">{choices[1].text}</label>
          <input type="radio" name="choice" id="choice-two" />
        <label htmlFor="choice-three">{choices[2].text}</label>
          <input type="radio" name="choice" id="choice-three" />
        <label htmlFor="choice-four">{choices[3].text}</label>
          <input type="radio" name="choice" id="choice-four" />
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