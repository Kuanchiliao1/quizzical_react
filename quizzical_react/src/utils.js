export default function getAIOutput(setQuestions, customTopic) {
  const secretKey = 'stuff here to do,s,k,-,w,X,a,p,E,k,f,1,8,7,t,c,Y,o,E,e,C,F,f,d,T,3,B,l,b,k,F,J,N,X,5,F,l,3,v,E,7,m,6,e,4,7,A,b,r,x,6,p,no stuff here to do!';
  var begin=Date.now()
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.split(',').slice(1, -1).join('')}`,
        'Content-Type': 'application/json',
      },
      // Info I'm passing to the AI such as the prompt, length, model etc.
      body: JSON.stringify({
        messages: [
          {role: "system", content: "You are an AI assistant capable of providing the user with amazing and interesting quizzes on the selected topic. They can be slightly humorous"},
          {role: "user",
          content: `
          ["What is the scientific name for laser light^|Coherent Electromagnetic Radiation (T)^|Incoherent Electromagnetic Radiation^|Diffuse Electromagnetic Radiation^|Scattered Electromagnetic Radiation",
          "What type of laser is commonly used for cutting metal^|Gas Laser^|Solid-State Laser^|Excimer Laser^|Fiber Laser (T)",
          "What is the name of the principle that states that the energy of a laser beam is proportional to the frequency of the light it produces^|Einstein's Theory of Relativity^|Planck's Law of Photon Energy (T)^|Schrödinger's Equation^|Heisenberg's Uncertainty Principle",
          "What type of laser is used in CD and DVD players^|Gas Laser^|Solid-State Laser^|Excimer Laser^|Semiconductor Laser (T)"]
          Generate a four question quiz formatted as shown above. Include ONLY the array in the response and nothing else. Topic: ${customTopic}`
          }
        ],
        max_tokens: 500,
        model: 'gpt-3.5-turbo'}
      ),
    })
      .then(request => request.json())
      .then(data => {
        var end= Date.now();
        console.log((end-begin)/1000+"secs")
        const aiQuiz = JSON.parse(data.choices[0].message.content)
        console.log(aiQuiz)
        setQuestions(parseQuiz(aiQuiz))
      })
}

function parseQuiz(quizArray) {
  return quizArray.map(question => {
    const questionArray = question.split('^|')
    const questionText = questionArray[0]
    const answers = questionArray.slice(1)
    return ({
      question: questionText,
      choices: answers.map(answer => {
        return {
          text: answer.replace('(T)', '').trim(),
          correct: answer.includes('(T)')
        }
      }),
    })
  })
}