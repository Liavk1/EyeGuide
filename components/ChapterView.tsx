
import React, { useState, useEffect } from 'react';
import type { Chapter, ViewMode } from '../types';
import SummaryView from './SummaryView';
import FlashcardsView from './FlashcardsView';
import QuizView from './QuizView';

interface ChapterViewProps {
  chapter: Chapter;
  themeColor: 'amber' | 'blue' | 'green';
}

const ChapterView: React.FC<ChapterViewProps> = ({ chapter, themeColor = 'amber' }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('summary');

  useEffect(() => {
    setViewMode('summary');
  }, [chapter]);

  const renderView = () => {
    switch (viewMode) {
      case 'summary':
        return <SummaryView keyPoints={chapter.keyPoints} />;
      case 'flashcards':
        return <FlashcardsView flashcards={chapter.flashcards} themeColor={themeColor} />;
      case 'quiz':
        return <QuizView questions={chapter.quiz} themeColor={themeColor} />;
      default:
        return null;
    }
  };

  const NavButton: React.FC<{ mode: ViewMode, text: string, icon: React.ReactNode }> = ({ mode, text, icon }) => {
    const activeClasses = {
        amber: 'text-amber-600 border-amber-500 bg-amber-50',
        blue: 'text-blue-600 border-blue-500 bg-blue-50',
        green: 'text-green-600 border-green-500 bg-green-50',
    }[themeColor];

    return (
     <button
        onClick={() => setViewMode(mode)}
        className={`flex-1 flex items-center justify-center gap-2 p-3 font-bold rounded-t-lg transition-colors duration-200 border-b-4 
        ${viewMode === mode 
            ? activeClasses 
            : 'text-gray-500 border-transparent hover:bg-gray-100'}`}
    >
        {icon}
        {text}
    </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-3xl font-extrabold text-gray-800">{chapter.title}</h2>
      </div>
      <nav className="flex border-b">
        <NavButton mode="summary" text="סיכום" icon={<PencilIcon />} />
        <NavButton mode="flashcards" text="כרטיסיות" icon={<CardStackIcon />} />
        <NavButton mode="quiz" text="בחן את עצמך" icon={<QuestionMarkIcon />} />
      </nav>
      <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-gray-50">
        {renderView()}
      </div>
    </div>
  );
};

const PencilIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const CardStackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
);

const QuestionMarkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

export default ChapterView;