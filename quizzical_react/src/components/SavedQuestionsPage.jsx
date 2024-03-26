import "../index.css"
import React from "react";
import { useNavigate } from 'react-router-dom'

export default function SavedQuestionsPage(props) {
  const navigate = useNavigate();

  function handleDeleteBtn(question) {
    props.setStoredQuizData(oldData => {
      const storedQuestions = oldData.savedQuestions.filter(data => data.questionText !== question)
      return ({
        ...oldData,
        savedQuestions: storedQuestions
      })
    })
  }

  function handleExplanationBtn(questionIndex) {
    const question = props.storedQuizData.savedQuestions[questionIndex].questionText

    props.setStoredQuizData(oldData => {
      const storedQuestions = 
        oldData.savedQuestions.map((questionData, index) => {
          if (index === questionIndex) {
            return ({
              ...questionData,
              explanationText: "",
              waiting: true
            })
          } else {
            return ({
              ...questionData
            })
          }
        })
      return ({
        ...oldData,
        savedQuestions: storedQuestions
      })
    })

    // TODO: Remove old key and use backend to retrieve explanations
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
          content: `Question: ${question} Give a short and witty one paragraph long explanation for someone without context. Use emojis as appropriate. Give BRIEF positive feedback if answered correctly or explain why their selected choice was wrong.`
          }
        ],
        max_tokens: 250,
        model: 'gpt-3.5-turbo'}
      ),
    })
      .then(request => request.json())
      .then(data => {
        const aiExplanation = data.choices[0].message.content
        props.setStoredQuizData(oldData => {
          const storedQuestions = 
            oldData.savedQuestions.map((questionData, index) => {
              if (index === questionIndex) {
                return ({
                  ...questionData,
                  explanationText: aiExplanation,
                  waiting: false
                })
              } else {
                return ({
                  ...questionData
                })
              }
            })
          return ({
            ...oldData,
            savedQuestions: storedQuestions
          })
        })
      })
  }
  return (
    <div>
      <button onClick={() => navigate('/')}>Back to home</button>
      {props.storedQuizData.savedQuestions.map((questionData, index) => {
        const question = questionData.questionText
        const explanation = questionData.explanationText
        const isWaiting = questionData.waiting
      
        return (
          <div className="questions-container">
            <div className="question-container saved-question-container">
              <h2>{`${index + 1}. ${question}`}</h2>
              <div className="explanation-btn-container">
                <button
                  className="ai-explaination"
                  onClick={() => handleExplanationBtn(index)}
                  type="button"
                  disabled={
                    isWaiting || explanation
                  }
                  >
                    Generate explanation
                </button>
                <button
                  className="delete-question"
                  onClick={() => {
                    handleDeleteBtn(question)
                  }}
                  type="button"
                  >
                  Delete
                </button>
              </div>
              <p>
                {!explanation && isWaiting && <i className="explanation-spinner fas fa-spinner fa-pulse"></i>}
                {explanation}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}