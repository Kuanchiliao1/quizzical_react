import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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