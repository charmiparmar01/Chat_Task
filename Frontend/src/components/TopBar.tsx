import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SessionsContext } from '../context/SessionsContext';
import { 
  Bars3Icon,
  SunIcon, 
  MoonIcon 
} from '@heroicons/react/24/outline';

export const TopBar: React.FC = () => {
  const { theme, toggle } = useContext(ThemeContext);
  const { toggleMobile } = useContext(SessionsContext);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-3 
      border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleMobile} 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
            transition-colors"
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="text-lg font-semibold">Chat App</div>
      </div>

      <button
        onClick={toggle}
        className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 
          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </button>
    </header>
  );
};
