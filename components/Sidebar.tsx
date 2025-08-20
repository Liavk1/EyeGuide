
import React from 'react';

interface ChapterInfo {
  id: number;
  title: string;
}

interface SidebarProps {
  chapters: ChapterInfo[];
  selectedChapterId: number;
  onSelectChapter: (index: number) => void;
  onClose?: () => void;
  themeColor: 'amber' | 'blue' | 'green';
}

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ chapters, selectedChapterId, onSelectChapter, onClose, themeColor = 'amber' }) => {
  const selectedClasses = {
    amber: 'bg-amber-100 text-amber-700 shadow-inner',
    blue: 'bg-blue-100 text-blue-700 shadow-inner',
    green: 'bg-green-100 text-green-700 shadow-inner',
  }[themeColor];
  
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center text-gray-700 border-b pb-3 mb-6">
        <h2 className="text-xl font-bold">פרקי הספר</h2>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 -mr-1 rounded-full hover:bg-gray-200 transition-colors" aria-label="סגור תפריט">
            <CloseIcon className="h-6 w-6 text-gray-500" />
          </button>
        )}
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {chapters.map((chapter, index) => (
            <li key={chapter.id} className="mb-1">
              <button
                onClick={() => onSelectChapter(index)}
                className={`w-full text-right p-3 rounded-lg transition-all duration-200 text-base font-semibold
                  ${selectedChapterId === chapter.id
                    ? selectedClasses
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                }
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;