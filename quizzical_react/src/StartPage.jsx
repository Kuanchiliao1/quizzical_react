import "./index.css"

export default function StartPage(props) {
  return (
    <div className="start-page">
      <h1 className="title">Quizzical</h1>
      <p>Enter a topic or Start Quiz for random topic</p>
      <button onClick={props.start}>Start quiz</button>
    </div>
  )
}