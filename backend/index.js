require('dotenv').config();
const modelMessages = require('./modelMessages')
const express = require('express');

const app = express();
app.use(express.json());

function fetchOpenAIOutput(messages, model='gpt-3.5-turbo', max_tokens=70) {
  console.log('fetch function working')
  return fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      // Info I'm passing to the AI such as the prompt, length, model etc.
      body: JSON.stringify({
        messages,
        max_tokens,
        model}
      ),
    })
      .then(res => res.json())
      .then(data => data.choices[0].message.content);
}

app.get('/', (req, res) => {
  console.log(process.env.OPENAI_KEY);
  res.send('<h1>HELLO!</h1>')
})

app.post('/api/generate-custom-quiz', async (req, res) => {
  /*
    - Call the fetchOpenAIOutput function
      - pass in object from request (messages, model, tokens)
    - Return the output string
    - Maybe parse it

    Questions:
    - How can I handle errors here?
    - Should I log out the entire object?
    - Are the logs vulnerable from a security perspective
  */
})

app.get('/api/generate-score-feedback', async (req, res) => {
  /*
  req format
  {
    topic: string,
  }
  requestData

  modelMessages(requestData.topic)

  req.body = {messages, model, max_tokens}
  */
  const requestData = req.body;
  const messages = modelMessages(requestData.topic);
  const response = await fetchOpenAIOutput(messages, 'gpt-4-turbo-preview', 500);
  console.log(response);
})

const PORT = 3005;
app.listen(PORT);