import axios from "axios";

export function fetchAIOutput(setQuestionsData, customTopic) {
  console.log("called fetchAIOutput");
  // Expect output to be parsed quiz array
  axios
    .post("http://localhost:3006/api/generate-custom-quiz", {
      topic: customTopic,
    })
    .then((res) => {
      try {
        const quizData = res.data;
        setQuestionsData(quizData);
      } catch (e) {
        alert(
          "Sorry! I could not understand your custom topic. Here is a general quiz instead."
        );
        fetchQuizApiOutput(setQuestionsData);
      }
    });
}

export function fetchAIScoreFeedback(
  setStoredQuizData,
  currentScore,
  totalScore
) {
  axios.post('http://localhost:3006/api/generate-score-feedback', {currentScore, totalScore})
    .then(res => {
      setStoredQuizData((oldData) => {
        console.log({data: res.data})
        return {
          ...oldData,
          scoreFeedback: res.data,
        };
      });
    })
}

export function fetchQuizApiOutput(setQuestionsData) {
  fetch("https://opentdb.com/api.php?amount=4&type=multiple&encode=base64")
    .then((res) => res.json())
    .then((data) => {
      const questionObjects = data.results.map((questionData) => {
        const { question, incorrect_answers, correct_answer } = questionData;
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

function decodeBase64(string) {
  string = atob(string);
  string = string.replace(/Ã©/, "é");
  return string;
}
