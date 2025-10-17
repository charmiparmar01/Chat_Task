import React, { useContext, useState } from 'react';
import { SessionsContext } from '../context/SessionsContext';
import { 
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import type { Session } from '../types';

export const LeftPanel: React.FC = () => {
  const { 
    sessions, 
    selectedSessionId, 
    selectSession, 
    createNewSession, 
    mobileOpen, 
    toggleMobile 
  } = useContext(SessionsContext);
  const [open, setOpen] = useState(true);

  const userInfo = {
    name: 'Charmi Parmar',
    initial: 'CP',
    email: 'charmi@example.com'
  };

  return (
    <>
      <aside className={`hidden md:flex flex-col fixed left-0 top-14 bottom-0
        transition-all duration-200 border-r border-gray-200 dark:border-gray-700 
        ${open ? 'w-64' : 'w-16'} bg-white dark:bg-gray-900 z-40`}>
        
        <div className="p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {open && <div className="text-lg font-semibold">Chats</div>}
          <button 
            onClick={() => setOpen(o => !o)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {open ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="p-2">
          <button
            onClick={() => createNewSession()}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg
              bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            {open && <span>New Chat</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {sessions.map((s: Session) => (
            <button
              key={s.id}
              onClick={() => selectSession(s.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors
                ${selectedSessionId === s.id 
                  ? 'bg-gray-100 dark:bg-gray-800' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <div className="text-sm font-medium truncate">
                {open ? s.title : s.title.charAt(0)}
              </div>
              {open && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(s.lastUpdated).toLocaleString()}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center 
              justify-center text-white font-medium text-sm">
              {userInfo.initial}
            </div>
            {open && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{userInfo.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userInfo.email}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={toggleMobile}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 
            shadow-xl flex flex-col">
            
            <div className="p-4 flex items-center justify-between border-b 
              border-gray-200 dark:border-gray-700">
              <div className="text-lg font-semibold">Chats</div>
              <button 
                onClick={toggleMobile}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2">
              <button
                onClick={() => {
                  createNewSession();
                  toggleMobile();
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg
                  bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Chat</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {sessions.map((s: Session) => (
                <button
                  key={s.id}
                  onClick={() => {
                    selectSession(s.id);
                    toggleMobile();
                  }}
                  className={`w-full text-left p-3 rounded-lg mb-1 transition-colors
                    ${selectedSessionId === s.id 
                      ? 'bg-gray-100 dark:bg-gray-800' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <div className="text-sm font-medium truncate">{s.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(s.lastUpdated).toLocaleString()}
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center 
                  justify-center text-white font-medium text-sm">
                  {userInfo.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{userInfo.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
