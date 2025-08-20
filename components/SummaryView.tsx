
import React, { useState } from 'react';
import type { KeyPoint } from '../types';

const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const SummaryView: React.FC<{ keyPoints: KeyPoint[] }> = ({ keyPoints }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 mb-6">נקודות מפתח</h3>
      <div className="space-y-3">
        {keyPoints.map((point, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center p-4 text-right focus:outline-none"
              aria-expanded={expandedIndex === index}
              aria-controls={`details-${index}`}
            >
              <p className="text-gray-800 text-lg font-semibold flex-1">{point.title}</p>
              <ChevronDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`} />
            </button>
            <div 
              id={`details-${index}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 pb-4">
                  <p className="text-gray-600 text-base whitespace-pre-line border-t pt-3">{point.details}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryView;