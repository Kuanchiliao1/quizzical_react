export default function getAIOutput(prompt = "") {
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
          {role: "system", content: "You are an AI assistant capable of providing the user with any request. You have a fun loving personality and are humorous"},
          {role: "user",
          content: `[
            {
              "question": "What is the scientific name for laser light?",
              "choices": [
                {
                  "text": "Coherent Electromagnetic Radiation",
                  "correct": true
                },
                {
                  "text": "Incoherent Electromagnetic Radiation",
                  "correct": false
                },
                {
                  "text": "Diffuse Electromagnetic Radiation",
                  "correct": false
                },
                {
                  "text": "Scattered Electromagnetic Radiation",
                  "correct": false
                }
              ]
            },
            {
              "question": "What type of laser is commonly used for cutting metal?",
              "choices": [
                {
                  "text": "Gas Laser",
                  "correct": false
                },
                {
                  "text": "Solid-State Laser",
                  "correct": false
                },
                {
                  "text": "Excimer Laser",
                  "correct": false
                },
                {
                  "text": "Fiber Laser",
                  "correct": true
                }
              ]
            },
            {
              "question": "What is the name of the principle that states that the energy of a laser beam is proportional to the frequency of the light it produces?",
              "choices": [
                {
                  "text": "Einstein's Theory of Relativity",
                  "correct": false
                },
                {
                  "text": "Planck's Law of Photon Energy",
                  "correct": true
                },
                {
                  "text": "Schrödinger's Equation",
                  "correct": false
                },
                {
                  "text": "Heisenberg's Uncertainty Principle",
                  "correct": false
                }
              ]
            },
            {
              "question": "What type of laser is used in CD and DVD players?",
              "choices": [
                {
                  "text": "Gas Laser",
                  "correct": false
                },
                {
                  "text": "Solid-State Laser",
                  "correct": false
                },
                {
                  "text": "Excimer Laser",
                  "correct": false
                },
                {
                  "text": "Semiconductor Laser",
                  "correct": true
                }
              ]
            },
          ]
          Generate ONE object formatted in the same way as shown above. Include ONLY the object in the response. The topic is grammer.`
          }
        ],
        max_tokens: 1,
        model: 'gpt-3.5-turbo'}
      ),
    })
      .then(request => request.json())
      .then(data => {
        const aiQuiz = data.choices[0].message.content
        console.log(aiQuiz)
        var end= Date.now();
        console.log((end-begin)/1000+"secs")
        console.count("requests")
      })
}