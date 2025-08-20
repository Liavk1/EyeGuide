
import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  themeColor: 'amber' | 'blue' | 'green';
}

const QuizView: React.FC<QuizViewProps> = ({ questions, themeColor = 'amber' }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Reset state when questions change (new chapter)
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowScore(false);
  }, [questions]);

  const themeClasses = {
    amber: {
      bg: 'bg-amber-500',
      hoverBg: 'hover:bg-amber-600',
      hoverOptionBg: 'hover:bg-amber-50',
    },
    blue: {
      bg: 'bg-blue-500',
      hoverBg: 'hover:bg-blue-600',
      hoverOptionBg: 'hover:bg-blue-50',
    },
    green: {
      bg: 'bg-green-500',
      hoverBg: 'hover:bg-green-600',
      hoverOptionBg: 'hover:bg-green-50',
    }
  }[themeColor];


  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowScore(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowScore(false);
  };

  if (showScore) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">השאלון הושלם!</h3>
        <p className="text-xl">הציון שלך: {score} מתוך {questions.length} ({percentage}%)</p>
        <button 
          onClick={handleRestart}
          className={`mt-6 text-white font-bold py-2 px-6 rounded-lg transition-colors ${themeClasses.bg} ${themeClasses.hoverBg}`}>
            התחל מחדש
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
        return `bg-white ${themeClasses.hoverOptionBg} border-gray-300`;
    }
    if (option === currentQuestion.correctAnswer) {
        return "bg-green-100 border-green-400 text-green-800";
    }
    if (option === selectedAnswer) {
        return "bg-red-100 border-red-400 text-red-800";
    }
    return "bg-white border-gray-300 opacity-60";
  };


  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">בחן את עצמך</h3>
      <p className="text-gray-500 mb-6">שאלה {currentQuestionIndex + 1} מתוך {questions.length}</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-xl font-semibold mb-6">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className={`w-full text-right p-4 rounded-lg border-2 font-medium transition-all duration-200 ${getButtonClass(option)}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {isAnswered && (
        <div className="mt-6 text-center">
            <button 
              onClick={handleNext}
              className={`text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md ${themeClasses.bg} ${themeClasses.hoverBg}`}>
                {currentQuestionIndex < questions.length - 1 ? 'השאלה הבאה' : 'סיים שאלון'}
            </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;