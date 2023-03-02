import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './index.css'
import StartPage from './StartPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <StartPage />
      
    </div>
  )
}

export default App

/*
When someone presses the button, conditionally render the first and main page

Structure:
- App
  - Start Page
  - Main Page(if start button OR rerender btn is pressed)
    - store state here
    - Questions
      - map over questions
      - Question
        - question
        - 4 choices as radio inputs
          - remember to store state of all inputs
          - use that state as "source truth"
    - Check answers btn
      - display score
      - Play again btn

  

*/