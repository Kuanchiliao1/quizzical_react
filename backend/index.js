require("dotenv").config();
const modelMessages = require("./modelMessages");
const express = require("express");
const cors = require("cors");
const { parseQuiz } = require("./utils");
const { parse } = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());

console.log("express is running");

async function fetchOpenAIOutput(messages, model, max_tokens) {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const method = "POST";
  const headers = {
    Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    messages,
    max_tokens,
    model,
  });

  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error, response status is ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

app.post("/api/generate-score-feedback", async (req, res) => {
  const { currentScore, totalScore } = req.body;
  const message = modelMessages.scoreFeedback(currentScore, totalScore);
  const responseData = await fetchOpenAIOutput(message, "gpt-3.5-turbo", 70);
  console.log(responseData);
  res.json(responseData);
  /*
    - Call the fetchOpenAIOutput function
      - pass in info from request
    Request object
    {
      currentScore: number,
      totalScore: number
    }
    - Return the output string
    - Maybe parse it

    Questions:
    - How can I handle errors here?
    - Should I log out the entire object?
    - Are the logs vulnerable from a security perspective
  */
});

app.get("/", (req, res) => console.log("test"));

app.post("/api/generate-custom-quiz", async (req, res) => {
  /*
  requestData:
  {
    topic: string,
  }

  messages = modelMessages(requestData.topic)

  req.body = {messages, model, max_tokens}
  */
  console.log({ body: req.body }, "req.body.topic: ", req.body.topic);
  const { topic } = req.body;
  const messages = modelMessages.customQuiz(topic);
  const outputString = await fetchOpenAIOutput(
    messages,
    "gpt-4-turbo-preview",
    500
  );
  console.log(parseQuiz(outputString));
  res.json(parseQuiz(outputString));
});

// TODO: move opendb request here from frontend
app.get("/api/opendb", (req, res) => {});

// TODO: get ports to auto update
const PORT = 3006;
app.listen(PORT);
