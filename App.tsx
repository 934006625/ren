import React, { useState } from 'react';
import { Landing } from './components/Landing';
import { Gallery } from './components/Gallery';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'gallery'>('landing');

  return (
    <div className="w-full h-screen text-white relative overflow-hidden">
      {view === 'landing' && (
        <Landing onEnter={() => setView('gallery')} />
      )}
      {view === 'gallery' && (
        <Gallery onBack={() => setView('landing')} />
      )}
    </div>
  );
};

export default App;