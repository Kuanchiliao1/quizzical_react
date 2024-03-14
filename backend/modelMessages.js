const modelMessages = {
  customQuiz(topic) {
    return [
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
      Input: Quiz topic: ${topic}
      Output:
      `
      }
    ]
  },
  scoreFeedback(currentScore, totalScore) {
    return [
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
    ]
  }
}

module.exports =  modelMessages;