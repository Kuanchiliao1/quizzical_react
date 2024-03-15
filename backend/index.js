require('dotenv').config();
const modelMessages = require('./modelMessages')
const express = require('express');

const app = express();
app.use(express.json());

async function fetchOpenAIOutput(messages, model, max_tokens) {
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  const method = 'POST';
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    messages,
    max_tokens,
    model}
  );

  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error, response status is ${response.status}`)
    }
  
    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch(error) {
    console.log(error);
  }
}

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