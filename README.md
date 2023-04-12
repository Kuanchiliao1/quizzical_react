# 🤖 Quizzical

Quizzical is a React-based quiz application that allows users to input their own quiz topic, which is then generated using OpenAI's GPT-Turbo model. Users can bookmark questions, request AI-generated explanations, and receive AI feedback based on their current score. The application also stores quiz questions and user scores via local storage.

## 🚀 Installation

This project was built using [Vite](https://vitejs.dev/). To get started, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Kuanchiliao1/quizzical_react.git
```

2. Navigate to the project directory:
```
cd quizzical_react
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm run dev
```

## Usage

The main features of Quizzical are:

- Input your own quiz topic for the AI to generate a quiz.
- Bookmark questions for future reference.
- Request AI-generated explanations for quiz questions.
- Receive AI feedback on your current score.
- View and manage saved questions.

## 🌟 Future Improvements

1. Handle situations where the API doesn't respond via throttling or exponential backoff.
2. Add a leaderboard feature to display user scores.
3. Implement a mechanism to prevent duplicate quiz questions from being generated, considering the trade-off of prompt size, token usage, and response time.
4. Add testing to the application.

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). For more details, see the [LICENSE](./LICENSE) file.

