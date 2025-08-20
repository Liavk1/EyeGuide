import React from 'react';

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a.75.75 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
  </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);


interface HeaderProps {
  onMenuClick: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
  themeColor: 'amber' | 'blue' | 'green';
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showBackButton, onBack, themeColor = 'amber' }) => {
  const themeClasses = {
    amber: {
      text: 'text-amber-500',
      ring: 'focus:ring-amber-500',
    },
    blue: {
      text: 'text-blue-500',
      ring: 'focus:ring-blue-500',
    },
    green: {
      text: 'text-green-500',
      ring: 'focus:ring-green-500',
    }
  }[themeColor];

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* This group will appear on the RIGHT in RTL */}
        <div className="flex items-center gap-3">
           <button 
             onClick={onMenuClick} 
             className={`lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 ${themeClasses.ring}`}
             aria-label="פתח תפריט"
           >
              <MenuIcon className="h-6 w-6 text-gray-600" />
           </button>
            <EyeIcon className={`h-8 w-8 ${themeClasses.text}`} />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <span className={themeClasses.text}>Ophtho</span>Book
            </h1>
        </div>
        
        {/* This group will appear on the LEFT in RTL */}
        <div className="flex items-center">
            {showBackButton && (
                 <button 
                    onClick={onBack} 
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 ${themeClasses.ring} text-gray-600 font-semibold`}
                    aria-label="חזור"
                >
                    <BackIcon className="h-5 w-5" />
                    <span>חזרה</span>
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;