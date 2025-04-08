'use client';

import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizDisplayProps {
  quiz: {
    questions: Question[];
  };
  onReset: () => void;
}

export default function QuizDisplay({ quiz, onReset }: QuizDisplayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Extract the letter from the option (e.g., "A" from "A) First option")
  const getOptionLetter = (option: string): string => {
    return option.charAt(0);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    // Compare the letter of the selected answer with the correct answer
    if (getOptionLetter(answer) === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentQuestion === quiz.questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleStartNewQuiz = () => {
    window.location.reload();
  };

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  if (quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
          <div className="mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{quiz.questions.length}</div>
            <div className="text-gray-600">
              {score === quiz.questions.length 
                ? "Perfect score! Excellent job!" 
                : score >= quiz.questions.length * 0.7 
                  ? "Good job! You passed the quiz!" 
                  : "Keep practicing! You can do better next time."}
            </div>
          </div>
          <button
            onClick={handleStartNewQuiz}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 transition-colors duration-200">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{question.question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => !selectedAnswer && handleAnswerSelect(option)}
            disabled={!!selectedAnswer}
            className={`w-full text-left p-3 rounded-lg border ${
              selectedAnswer
                ? getOptionLetter(option) === question.correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : selectedAnswer === option
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
            } transition-colors duration-200`}
          >
            <span className="text-gray-900 dark:text-white">{option}</span>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center mb-2">
            {selectedAnswer && getOptionLetter(selectedAnswer) === question.correctAnswer ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className="font-medium text-gray-900 dark:text-white">
              {selectedAnswer && getOptionLetter(selectedAnswer) === question.correctAnswer
                ? 'Correct!'
                : 'Incorrect'}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Score: {score}/{currentQuestion + 1}
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-800"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
} 