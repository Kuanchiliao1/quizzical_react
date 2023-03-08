import { useState } from "react";
import React from "react";
import "./index.css";
import StartPage from "./components/StartPage";
import MainPage from "./components/MainPage";
import getAIOutput from "./utils";

function App() {
  const [start, setStart] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [newQuestions, setNewQuestions] = React.useState([]);
  let useEffectCount = 0;

  function startQuiz() {
    setStart(true);
  }

  // fisher-yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function decodeBase64(string) {
    string = atob(string);
    string = string.replace(/Ã©/, "é");
    return string;
  }

  function fetchNewQuestions() {
    setNewQuestions([]);
    setStart(false);
  }

  // Only run on initial render/rerender
  React.useEffect(() => {
    if (start) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
        .then((res) => res.json())
        .then((data) => {
          const questionObjects = data.results.map((questionData) => {
            const { question, incorrect_answers, correct_answer } =
              questionData;
            return {
              question: decodeBase64(question),
              choices: shuffle([
                { text: decodeBase64(correct_answer), correct: true },
                { text: decodeBase64(incorrect_answers[0]), correct: false },
                { text: decodeBase64(incorrect_answers[1]), correct: false },
                { text: decodeBase64(incorrect_answers[2]), correct: false },
              ]),
            };
          });
          setQuestions(questionObjects);
          console.count("quiz API");
          getAIOutput();
          useEffectCount += 1;
        });
    }
  }, [newQuestions]);

  return (
    <div className="App">
      {start ? (
        <MainPage questions={questions} fetchQuestions={fetchNewQuestions} />
      ) : (
        <StartPage start={startQuiz} />
      )}
    </div>
  );
}

export default App;


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

  State:
  questionObject = {
    question: "What is the capital of France?",
    choices: {
      "Paris": true,
      "London": false,
      "Berlin": false,
      "Rome": false
    }
  }

*/

/*
Fischer Yates
- Loop through array in reverse order
  - for array [1,2,3,4,5]
  - for (i = array.length - 1; i > 0; i--)
    - i starts at 4, 3, 2, 1
      - j is random value < i -1
        - i = 4, j = 3 * Math.random()
    switch the values
	*/