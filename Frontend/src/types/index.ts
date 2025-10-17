export type TableData = {
  columns: string[];
  rows: (string | number)[][];
};

export type Answer = {
  messageId: string;
  question: string;
  answer: TableData;
  description: string;
  feedback?: 'like' | 'dislike' | null;
  timestamp?: string;
};

export type Session = {
  id: string;
  title: string;
  lastUpdated: string;
};

export type SessionHistory = {
  id: string;
  history: Answer[];
};
