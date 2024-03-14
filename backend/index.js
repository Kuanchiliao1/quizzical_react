require('dotenv').config();

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

app.get('/api/fetchOpenAIOutput', async (req, res) => {
  /*
  req format
  {
    messages,
    model,
    max_tokens,
  }

  req.body = {messages, model, max_tokens}
  */
  const messages = [
    {role: "system", content: "You are a quiz generation AI. Provide the user with accurate and entertaining multiple choice quizzes on the selected custom topic. The quizzes consist of four moderate difficulty questions with 4 multiple-choice answers. If the topic is unclear, respond with 'error: topic unclear'"},
    {role: "user",
    content: `
    Generate a quiz formatted as shown below. Output must start with [ character and end with ] character
    ###
    Input: Quiz topic: ;aslkejfa;lsjf
    Output:
    'error: topic unclear'
    ###
    Input: Quiz topic: drugs
    Output:
    ["What is the active ingredient in aspirin?^|Salicylic acid (T)^|Acetaminophen^|Ibuprofen^|Naproxen",
    "What type of drug is used to treat depression?^|Antidepressants (T)^|Antihistamines^|Antipsychotics^|Antibiotics",
    "What type of drug is used to treat anxiety?^|Benzodiazepines (T)^|Antidepressants^|Antihistamines^|Antipsychotics",
    "What type of drug is used to treat allergies?^|Antihistamines (T)^|Antidepressants^|Antipsychotics^|Antibiotics"]
    ###
    Input: Quiz topic: Star Wars
    Output:
    ["Who is the main protagonist of the original Star Wars trilogy?^|Luke Skywalker (T)^|Han Solo^|Princess Leia^|Darth Vader",
    "What is the name of the planet where the Jedi Temple is located?^|Tatooine^|Coruscant (T)^|Endor^|Alderaan",
    "Who is the pilot of the Millennium Falcon?^|Chewbacca (T)^|R2-D2^|Lando Calrissian^|C-3PO",
    "Who is the main antagonist of the original Star Wars trilogy?^|Darth Vader (T)^|The Emperor^|Boba Fett^|Jabba the Hutt"]
    Input: Quiz topic: stars
    Output:
    `
    }
  ]
  const response = await fetchOpenAIOutput(messages, 'gpt-4-turbo-preview', 500);
  console.log(response);
})

const PORT = 3005;
app.listen(PORT);