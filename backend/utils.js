function parseQuiz(quizString) {
  const array = JSON.parse(quizString)
  return array.map(question => {
    const questionArray = question.split('^|')
    const questionText = questionArray[0]
    const answers = questionArray.slice(1)
    return ({
      question: questionText,
      choices: shuffle(answers.map(answer => {
        return {
          text: answer.replace('(T)', '').trim(),
          correct: answer.includes('(T)')
        }
      })),
    })
  })
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

module.exports = { parseQuiz, shuffle, decodeBase64 }