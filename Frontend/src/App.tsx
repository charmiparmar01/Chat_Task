import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SessionsProvider } from './context/SessionsContext';
import { TopBar } from './components/TopBar';
import { LeftPanel } from './components/LeftPanel';
import { ChatWindow } from './components/ChatWindow';

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <ThemeProvider>
      <SessionsProvider>
        <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-gray-900">
          <TopBar />
          <div className="flex-1 flex overflow-hidden">
            <LeftPanel />
            <main className={`flex-1 transition-all duration-200
              ${open ? 'md:ml-64' : 'md:ml-16'}`}>
              <ChatWindow />
            </main>
          </div>
        </div>
      </SessionsProvider>
    </ThemeProvider>
  );
};

export default App;
