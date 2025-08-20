import React from 'react';
import type { Book } from '../types';

interface BookSelectionScreenProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);


const BookSelectionScreen: React.FC<BookSelectionScreenProps> = ({ books, onSelectBook }) => {
  const themes = {
    amber: {
      border: 'border-amber-400',
      bgIcon: 'bg-amber-100',
      textIcon: 'text-amber-600',
      textLink: 'text-amber-500 group-hover:text-amber-600',
      accentText: 'text-amber-500'
    },
    blue: {
      border: 'border-blue-400',
      bgIcon: 'bg-blue-100',
      textIcon: 'text-blue-600',
      textLink: 'text-blue-500 group-hover:text-blue-600',
      accentText: 'text-blue-500'
    },
    green: {
      border: 'border-green-400',
      bgIcon: 'bg-green-100',
      textIcon: 'text-green-600',
      textLink: 'text-green-500 group-hover:text-green-600',
      accentText: 'text-green-500'
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          המדריך ל<span className="text-amber-500">רפואת עיניים</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          ברוכים הבאים! בחרו ספר כדי להתחיל במסע הלימוד האינטראקטיבי שלכם.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {books.map((book) => {
          const theme = themes[book.themeColor];
          return (
          <button
            key={book.id}
            onClick={() => onSelectBook(book)}
            className={`group bg-white p-8 rounded-2xl shadow-lg text-right hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-t-4 ${theme.border}`}
          >
            <div className="flex items-start gap-4">
                <div className={`${theme.bgIcon} p-3 rounded-full`}>
                    <BookIcon className={`h-8 w-8 ${theme.textIcon}`} />
                </div>
                <div className='flex-1'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                    <p className="text-gray-600 mb-4">{book.description}</p>
                     <span className={`font-bold ${theme.textLink} transition-colors`}>
                        התחל ללמוד &rarr;
                    </span>
                </div>
            </div>
          </button>
          )
        })}
      </div>
    </div>
  );
};

export default BookSelectionScreen;