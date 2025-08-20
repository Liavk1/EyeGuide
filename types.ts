
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface KeyPoint {
  title: string;
  details: string;
}

export interface Chapter {
  id: number;
  title: string;
  keyPoints: KeyPoint[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface Book {
  id: number;
  title: string;
  description: string;
  chapters: Chapter[];
  themeColor: 'amber' | 'blue' | 'green';
}

export type ViewMode = 'summary' | 'flashcards' | 'quiz';