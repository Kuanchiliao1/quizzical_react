import "./index.css"

export default function MainPage(props) {
  const questionElements = props.questions.map(question => {
    return (
      <div className="question-container">
        <h2>{question.question}</h2>
        <p>{question.choices[0].text}</p>
        <p>{question.choices[1].text}</p>
        <p>{question.choices[2].text}</p>
        <p>{question.choices[3].text}</p>
      </div>
    )
  })

  return (
    <div>
      {questionElements}
      <h1></h1>
    </div>
  )
}