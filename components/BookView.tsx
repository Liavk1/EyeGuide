import React, { useState, useMemo, useEffect } from 'react';
import type { Chapter, Book } from '../types';
import Sidebar from './Sidebar';
import ChapterView from './ChapterView';
import Header from './Header';

interface BookViewProps {
    book: Book;
    onBack: () => void;
}

const BookView: React.FC<BookViewProps> = ({ book, onBack }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const themeColor = book.themeColor;

  const chapters = useMemo(() => book.chapters.map(c => ({ title: c.title, id: c.id })), [book]);
  const selectedChapter: Chapter | undefined = book.chapters[selectedChapterIndex];

  const handleSelectChapter = (index: number) => {
    setSelectedChapterIndex(index);
    setIsSidebarOpen(false);
  };
  
  // Effect to reset chapter index when book changes
  useEffect(() => {
    setSelectedChapterIndex(0);
  }, [book]);

  if (!selectedChapter) {
    return null; // Should not happen if a book is selected
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header onMenuClick={() => setIsSidebarOpen(true)} showBackButton={true} onBack={onBack} themeColor={themeColor} />
      <div className="flex flex-1 container mx-auto p-4 md:p-6 lg:p-8 gap-8">
        <main className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <ChapterView chapter={selectedChapter} themeColor={themeColor} />
        </main>
        <aside className="w-64 hidden lg:block bg-white rounded-2xl shadow-lg">
           <Sidebar
            chapters={chapters}
            selectedChapterId={selectedChapter.id}
            onSelectChapter={handleSelectChapter}
            themeColor={themeColor}
          />
        </aside>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar
            chapters={chapters}
            selectedChapterId={selectedChapter.id}
            onSelectChapter={handleSelectChapter}
            onClose={() => setIsSidebarOpen(false)}
            themeColor={themeColor}
        />
      </div>
    </div>
  );
};

export default BookView;