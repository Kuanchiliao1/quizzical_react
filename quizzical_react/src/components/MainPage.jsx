import "../index.css";
import React from "react";
import QuestionElements from "./QuestionElements"
import {fetchAIOutput, fetchQuizApiOutput, fetchAIScoreFeedback} from "../utils";

export default function MainPage(props) {
  const [allFormData, setAllFormData] = React.useState(null);
  const [questionExplanations, setQuestionExplanations] = React.useState({})

  const [isQuizSubmitted, setIsQuizSubmitted] = React.useState(false);
  const [questionsData, setQuestionsData] = React.useState(null);

  function handleChoiceSelection(event) {
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
 
  function handlePlayAgain() {
    props.end()
  }

  // Only run on initial render/rerender
  React.useEffect(() => {
    if (!questionsData) {
      if (!props.customQuizTopic) {
        setQuestionsData(fetchQuizApiOutput(setQuestionsData))
      } else {
        setQuestionsData(fetchAIOutput(setQuestionsData, props.customQuizTopic));
      }
    }
  }, []);

  React.useEffect(() => {
    if (questionsData) {
      setAllFormData(
        questionsData.reduce((object, questionData, index) => {
          let formId = index + 1;
          object[formId] = {
            correct: findCorrectChoice(questionData).toString(),
            checkedChoice: 0,
          };
          return object;
        }, {})
      )
    }
  }, [questionsData])

  // returns 1-4 to represent correct choice
  function findCorrectChoice(questionData) {
    return questionData.choices.findIndex((choice) => choice.correct) + 1;
  }

  function areFormsAllFilled() {
    return Object.values(allFormData).every((form) => form.checkedChoice);
  }

  function submitQuiz() {
    if (areFormsAllFilled()) {
      setIsQuizSubmitted((oldBoolean) => !oldBoolean);
      const [totalCorrect, totalQuestions] = getScore()
      const thisQuizScore = `${totalCorrect}/${totalQuestions}`
      const totalQuizScore = `${props.storedQuizData.questionsCorrect + totalCorrect}/${props.storedQuizData.questionsTotal + totalQuestions}`
      props.setStoredQuizData(oldData => {
        return ({
          ...oldData,
          questionsCorrect: oldData.questionsCorrect + totalCorrect,
          questionsTotal: oldData.questionsTotal + totalQuestions,
          lastQuizScore: `${totalCorrect}/${totalQuestions}`
        })
      })
      fetchAIScoreFeedback(props.setStoredQuizData, thisQuizScore, totalQuizScore)
    } else {
      alert("Please answer all questions!");
    }
  }

  function getScoreMessage() {
    const [totalCorrect, totalQuestions] = getScore()

    return `You scored ${totalCorrect}/${totalQuestions} correct answers`
  }

  function getScore() {
    const formArray = Object.values(allFormData)
    const totalCorrect = formArray.filter(form => form.correct === form.checkedChoice).length
    const totalQuestions = formArray.length
    return [totalCorrect, totalQuestions]
  }
  
  function handleExplanationBtn(formId, question) {
    setQuestionExplanations(oldExplanations => {
      return {
        ...oldExplanations,
        [formId]: {
          isBtnDisabled: true,
          waiting: true
        }
      }
    })

    const {chosenAnswerText, correctAnswerText} = getBasicQuestionData(formId)

    const userScoreFeedback = chosenAnswerText === correctAnswerText? "User answered correctly!" : `Incorrect user answer: ${chosenAnswerText}`

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
          {role: "system", content: "You are an AI assistant with a fun, loving, and humorous personality."},
          {role: "user",
          content: `Question: ${question} Correct answer: ${correctAnswerText}. ${userScoreFeedback}. Give a short and witty five sentence long explanation for someone without context. Use emojis as appropriate. Give BRIEF positive feedback if answered correctly or explain why their selected choice was wrong.`
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
            [formId]: {
              response: aiResponse,
              isBtnDisabled: true,
              waiting: false
            }
          }
        })
      })
  }

  function getBasicQuestionData(questionId) {
    const questionData = questionsData[questionId - 1]
    const correctAnswerIndex = allFormData[questionId].correct - 1
    const chosenAnswerIndex = allFormData[questionId].checkedChoice - 1

    return ({
      questionText: questionData.question,
      correctAnswerText: questionData.choices[correctAnswerIndex].text,
      chosenAnswerText: questionData.choices[chosenAnswerIndex].text,
    })
  }


  function handleSaveBtn(questionId) {
    props.setStoredQuizData(oldData => {
      return ({
        ...oldData,
        savedQuestions: [...oldData.savedQuestions, getBasicQuestionData(questionId)]
      })
    })
  }

  return (
    <div className="questions-container">
      < QuestionElements
        questions={questionsData}
        questionExplanations={questionExplanations}
        storedQuizData={props.storedQuizData}
        allFormData={allFormData}
        isQuizSubmitted={isQuizSubmitted}
        handleChoiceSelection={handleChoiceSelection}
        handleExplanationBtn={handleExplanationBtn}
        handleSaveBtn={handleSaveBtn}
      />
      {isQuizSubmitted ? (
        <div className="game-stat-container">
          <p className="score">{getScoreMessage()}</p>
          <button
            onClick={handlePlayAgain}
            type="button"
            >
            Play again
          </button>
        </div>
      ) : (
        questionsData && <button className="check-answers" onClick={submitQuiz}>Check answers</button>
      )}
      {!questionsData && 
        <div>
          <p className="loading">
          🤖 Hang tight while your quiz is being generated...
            <i className="quiz-loading fas fa-spinner fa-pulse"></i>
          </p>
        </div>
      }
    </div>
  );
}

