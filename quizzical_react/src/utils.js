const secretKey = 'stuff here to do,s,k,-,w,X,a,p,E,k,f,1,8,7,t,c,Y,o,E,e,C,F,f,d,T,3,B,l,b,k,F,J,N,X,5,F,l,3,v,E,7,m,6,e,4,7,A,b,r,x,6,p,no stuff here to do!';
import axios from 'axios';

export function fetchAIOutput(setQuestionsData, customTopic) {
  console.log('called fetchAIOutput')
  // Expect output to be parsed quiz array
  axios.post('http://localhost:3006/api/generate-custom-quiz', {topic: customTopic})
    .then(res => {
      try {
        const quizData = res.data;
        setQuestionsData(quizData);
      } catch (e) {
        alert('Sorry! I could not understand your custom topic. Here is a general quiz instead.')
        fetchQuizApiOutput(setQuestionsData)
      }
    })

  // var begin=Date.now()
  //   fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${secretKey.split(',').slice(1, -1).join('')}`,
  //       'Content-Type': 'application/json',
  //     },
  //     // Info I'm passing to the AI such as the prompt, length, model etc.
  //     body: JSON.stringify({
  //       messages: [
  //         {role: "system", content: "You are a quiz generation AI. Provide the user with accurate and entertaining multiple choice quizzes on the selected custom topic. The quizzes consist of four moderate difficulty questions with 4 multiple-choice answers. If the topic is unclear, respond with 'error: topic unclear'"},
  //         {role: "user",
  //         content: `
  //         Generate a quiz formatted as shown below. Output must start with [ character and end with ] character
  //         ###
  //         Input: Quiz topic: ;aslkejfa;lsjf
  //         Output:
  //         'error: topic unclear'
  //         ###
  //         Input: Quiz topic: drugs
  //         Output:
  //         ["What is the active ingredient in aspirin?^|Salicylic acid (T)^|Acetaminophen^|Ibuprofen^|Naproxen",
  //         "What type of drug is used to treat depression?^|Antidepressants (T)^|Antihistamines^|Antipsychotics^|Antibiotics",
  //         "What type of drug is used to treat anxiety?^|Benzodiazepines (T)^|Antidepressants^|Antihistamines^|Antipsychotics",
  //         "What type of drug is used to treat allergies?^|Antihistamines (T)^|Antidepressants^|Antipsychotics^|Antibiotics"]
  //         ###
  //         Input: Quiz topic: Star Wars
  //         Output:
  //         ["Who is the main protagonist of the original Star Wars trilogy?^|Luke Skywalker (T)^|Han Solo^|Princess Leia^|Darth Vader",
  //         "What is the name of the planet where the Jedi Temple is located?^|Tatooine^|Coruscant (T)^|Endor^|Alderaan",
  //         "Who is the pilot of the Millennium Falcon?^|Chewbacca (T)^|R2-D2^|Lando Calrissian^|C-3PO",
  //         "Who is the main antagonist of the original Star Wars trilogy?^|Darth Vader (T)^|The Emperor^|Boba Fett^|Jabba the Hutt"]
  //         Input: Quiz topic: ${customTopic}
  //         Output:
  //         `
  //         }
  //       ],
  //       max_tokens: 500,
  //       model: 'gpt-4-turbo-preview'}
  //     ),
  //   })
  //     .then(request => request.json())
  //     .then(data => {
  //       try {
  //         const aiQuiz = JSON.parse(data.choices[0].message.content)
  //         setQuestionsData(parseQuiz(aiQuiz))
  //       } catch (e) {
  //         alert('Sorry! I could not understand your custom topic. Here is a general quiz instead.')
  //         fetchQuizApiOutput(setQuestionsData)
  //       }
  //     })
}

export function fetchAIScoreFeedback(setStoredQuizData, currentScore, totalScore) {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.split(',').slice(1, -1).join('')}`,
        'Content-Type': 'application/json',
      },
      // Info I'm passing to the AI such as the prompt, length, model etc.
      body: JSON.stringify({
        messages: [
          {role: "system", content: "You are a kind, witty, not mean, and encouraging AI assistant. Provide the user with 2 sentence feedback their quiz scores. May use emojis. Always repeat back scores to user."},
          {role: "user",
          content: `
          Input:
          Recent quiz score: 1/4 Total score: 25/80
          Output:
          👍Keep up the great effort! You got 1/4 on the recent quiz, bringing your total score to 25/80. Keep striving towards progress! 👏
          Input:
          Recent quiz score: ${currentScore} Total score: ${totalScore}
          Output:`
          }
        ],
        max_tokens: 70,
        model: 'gpt-3.5-turbo'}
      ),
    })
      .then(request => request.json())
      .then(data => {
        setStoredQuizData(oldData => {
          return ({
            ...oldData,
            scoreFeedback: data.choices[0].message.content
          })
        })
      })
}

export function fetchQuizApiOutput(setQuestionsData) {
  fetch("https://opentdb.com/api.php?amount=4&type=multiple&encode=base64")
    .then((res) => res.json())
    .then((data) => {
      const questionObjects = data.results.map((questionData) => {
        const { question, incorrect_answers, correct_answer } =
          questionData;
        return {
          question: decodeBase64(question),
          choices: [
            { text: decodeBase64(correct_answer), correct: true },
            { text: decodeBase64(incorrect_answers[0]), correct: false },
            { text: decodeBase64(incorrect_answers[1]), correct: false },
            { text: decodeBase64(incorrect_answers[2]), correct: false },
          ],
        };
      });
      setQuestionsData(questionObjects);
    });
}

// function parseQuiz(quizArray) {
//   return quizArray.map(question => {
//     const questionArray = question.split('^|')
//     const questionText = questionArray[0]
//     const answers = questionArray.slice(1)
//     return ({
//       question: questionText,
//       choices: shuffle(answers.map(answer => {
//         return {
//           text: answer.replace('(T)', '').trim(),
//           correct: answer.includes('(T)')
//         }
//       })),
//     })
//   })
// }

// // fisher-yates shuffle
// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// }

function decodeBase64(string) {
  string = atob(string);
  string = string.replace(/Ã©/, "é");
  return string;
}