import React, { useState } from 'react';
import type { Book } from './types';
import { books } from './data/library';
import BookSelectionScreen from './components/BookSelectionScreen';
import BookView from './components/BookView';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (!selectedBook) {
    return <BookSelectionScreen books={books} onSelectBook={setSelectedBook} />;
  }

  return <BookView book={selectedBook} onBack={() => setSelectedBook(null)} />;
};

export default App;