import React, { createContext, useEffect, useState } from 'react';
import type { Session } from '../types';
import * as api from '../api/api';

type SessionsCtx = {
  sessions: Session[];
  selectedSessionId?: string;
  selectSession: (id: string) => void;
  createNewSession: (title?: string) => Promise<void>;
  reloadSessions: () => Promise<void>;
  mobileOpen: boolean;
  toggleMobile: () => void;
};

export const SessionsContext = createContext<SessionsCtx>({
  sessions: [],
  selectedSessionId: undefined,
  selectSession: () => {},
  createNewSession: async () => {},
  reloadSessions: async () => {},
  mobileOpen: false,
  toggleMobile: () => {}
});

export const SessionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>(undefined);
  const [mobileOpen, setMobileOpen] = useState(false);

  const reloadSessions = async () => {
    try {
      const s = await api.fetchSessions();
      setSessions(s);
      if (!selectedSessionId && s.length) setSelectedSessionId(s[0].id);
    } catch (err) {
      console.error('Failed to load sessions', err);
    }
  };

  useEffect(() => { reloadSessions(); /* eslint-disable-next-line */ }, []);

  const selectSession = (id: string) => {
    setSelectedSessionId(id);
    setMobileOpen(false); 
  };

  const createNewSession = async (title?: string) => {
    try {
      const newS = await api.createSession(title);
      await reloadSessions();
      setSelectedSessionId(newS.id);
      setMobileOpen(false);
    } catch (err) {
      console.error('Failed to create session', err);
    }
  };

  const toggleMobile = () => setMobileOpen(v => !v);

  return (
    <SessionsContext.Provider value={{ sessions, selectedSessionId, selectSession, createNewSession, reloadSessions, mobileOpen, toggleMobile }}>
      {children}
    </SessionsContext.Provider>
  );
};
