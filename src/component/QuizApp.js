import React, { useState, useEffect } from 'react';

const QuizzApp = () => {
  const [showFinal, setShowFinal] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const questions = [
    {
      text: 'Indian Institute of Technology (IIT), Delhi is to set up offshore campus in which city?',
      options: [
        { id: 0, text: ' Paris', isCorrect: false },
        { id: 1, text: ' Berlin', isCorrect: false },
        { id: 2, text: 'Niger', isCorrect: false },
        { id: 3, text: ' Abu Dhabi', isCorrect: true },
      ],
    },
    {
      text: 'Which among the following is not a trophy or cup related to Hockey?',
      options: [
        { id: 0, text: 'Narang Cup', isCorrect: true },
        { id: 1, text: 'Indira Gold Cup', isCorrect: false },
        { id: 2, text: ' Gurmeet Trophy', isCorrect: false },
        { id: 3, text: ' Bombay Gold Cup', isCorrect: false },
      ],
    },
    {
      text: 'What are the areas in Moon, formed by lava which cool to become basalt rock, commonly known as?',
      options: [
        { id: 0, text: ' Man in the Moon', isCorrect: true },
        { id: 1, text: 'Great Dippere', isCorrect: false },
        { id: 2, text: ' Holy Angel', isCorrect: false },
        { id: 3, text: 'Centre of Dipole', isCorrect: false },
      ],
    },
    {
      text: 'Who is known as the “Iron Man” of India?',
      options: [
        { id: 0, text: 'Rahul David', isCorrect: false },
        { id: 1, text: 'Sardar Vallabhbhai Patel', isCorrect: true },
        { id: 2, text: 'Dahyabhai Patel', isCorrect: false },
        { id: 3, text: 'Mahatma Gandhi', isCorrect: false },
      ],
    },
    {
      text: 'Which state is also known as the “fruit bowl” of India?',
      options: [
        { id: 0, text: 'Delhi', isCorrect: false },
        { id: 1, text: 'Himachal Pradesh', isCorrect: true },
        { id: 2, text: 'UP', isCorrect: false },
        { id: 3, text: 'Karnataka', isCorrect: false },
      ],
    },
  ];

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const optionClicked = (isCorrect, optionText) => {
    setShowCorrect(true);
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers((prev) => [...prev, { question: questions[currentQuestion].text, selected: optionText }]);
    }

    setTimeout(() => {
      setShowCorrect(false);
      if (currentQuestion + 1 < shuffledQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowFinal(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowFinal(false);
    setShuffledQuestions(shuffleArray(questions));
    setIncorrectAnswers([]);
  };

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  return (
    <div className="main">
      <h1>Indian Quiz</h1>
      <h2>Current Score: {score}</h2>

      {showFinal ? (
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - ({((score / questions.length) * 100).toFixed(2)}%)
          </h2>
          <h3>Incorrect Answers:</h3>
          <ul>
            {incorrectAnswers.map((answer, index) => (
              <li key={index}>
                <strong>Question:</strong> {answer.question} <br />
                <strong>Your Answer:</strong> {answer.selected}
              </li>
            ))}
          </ul>
          <button onClick={restartGame}>Restart Button</button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            Question {currentQuestion + 1} out of {shuffledQuestions.length}
          </h2>
          <h3>{shuffledQuestions[currentQuestion]?.text}</h3>

          <ul>
            {shuffledQuestions[currentQuestion]?.options.map((option) => (
              <li
                onClick={() => !showCorrect && optionClicked(option.isCorrect, option.text)}
                key={option.id}
                style={showCorrect && option.isCorrect ? { backgroundColor: 'lightgreen' } : {}}
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizzApp;
