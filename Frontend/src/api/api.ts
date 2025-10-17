import axios from 'axios';
import type { Session, SessionHistory, Answer } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
  timeout: 7000
});

export const fetchSessions = async (): Promise<Session[]> => {
  const r = await api.get<Session[]>('/chats');
  return r.data;
};

export const createSession = async (title?: string): Promise<Session> => {
  const r = await api.post<Session>('/chats', { title });
  return r.data;
};

export const fetchSessionHistory = async (id: string): Promise<SessionHistory> => {
  const r = await api.get<SessionHistory>(`/chats/${id}`);
  return r.data;
};

export const sendQuestion = async (id: string, question: string): Promise<Answer> => {
  const r = await api.post<Answer>(`/chats/${id}/messages`, { question });
  return r.data;
};
