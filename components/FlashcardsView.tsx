
import React, { useState } from 'react';
import type { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  themeColor: 'amber' | 'blue' | 'green';
}

const Flashcard: React.FC<FlashcardProps> = ({ card, themeColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  React.useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  const themeClasses = {
    amber: {
      border: 'border-amber-300',
      bgBack: 'bg-amber-100',
      textBackHeader: 'text-amber-800',
      textBackBody: 'text-amber-900',
    },
    blue: {
      border: 'border-blue-300',
      bgBack: 'bg-blue-100',
      textBackHeader: 'text-blue-800',
      textBackBody: 'text-blue-900',
    },
    green: {
      border: 'border-green-300',
      bgBack: 'bg-green-100',
      textBackHeader: 'text-green-800',
      textBackBody: 'text-green-900',
    }
  }[themeColor];


  return (
    <div className="w-full h-80 perspective-1000" onClick={handleFlip}>
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front of card */}
        <div className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-xl border-4 ${themeClasses.border}`}>
          <p className="text-gray-500 font-semibold mb-4">שאלה</p>
          <p className="text-2xl text-center font-bold text-gray-800">{card.question}</p>
        </div>
        {/* Back of card */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 rounded-2xl shadow-xl border-4 ${themeClasses.bgBack} ${themeClasses.border}`}>
          <p className={`${themeClasses.textBackHeader} font-semibold mb-4`}>תשובה</p>
          <p className={`text-xl text-center font-semibold ${themeClasses.textBackBody}`}>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FlashcardsView: React.FC<{ flashcards: FlashcardType[], themeColor: 'amber' | 'blue' | 'green' }> = ({ flashcards, themeColor = 'amber' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (!flashcards || flashcards.length === 0) {
    return <p>אין כרטיסיות זמינות עבור פרק זה.</p>;
  }
  
  const buttonClasses = {
    amber: 'bg-amber-500 hover:bg-amber-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
  }[themeColor];

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold text-gray-700 mb-6">כרטיסיות לימוד</h3>
      <div className="w-full max-w-2xl">
        <Flashcard card={flashcards[currentIndex]} themeColor={themeColor} />
      </div>
      <div className="mt-6 text-center font-semibold text-gray-600">
        כרטיסיה {currentIndex + 1} מתוך {flashcards.length}
      </div>
      <div className="flex justify-center gap-4 mt-4 w-full max-w-md">
        <button onClick={goToNext} className={`w-full text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md ${buttonClasses}`}>
          הבא
        </button>
        <button onClick={goToPrev} className="w-full bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors shadow-md">
          הקודם
        </button>
      </div>
    </div>
  );
};

export default FlashcardsView;