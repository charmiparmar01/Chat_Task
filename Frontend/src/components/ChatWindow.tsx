import React, { useContext, useEffect, useRef, useState } from 'react';
import { SessionsContext } from '../context/SessionsContext';
import * as api from '../api/api';
import type { Answer, SessionHistory } from '../types';
import { MessageInput } from './MessageInput';
import { AnswerTable } from './AnswerTable';

export const ChatWindow: React.FC = () => {
  const { selectedSessionId } = useContext(SessionsContext) as any;
  const [history, setHistory] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);

  const lastMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!selectedSessionId) { setHistory([]); return; }
    setLoading(true);
    api.fetchSessionHistory(selectedSessionId)
      .then((data: SessionHistory) => { if (mounted) setHistory(data.history || []); })
      .catch(console.error)
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [selectedSessionId]);

  useEffect(() => {
    const container = messagesRef.current;
    const last = lastMsgRef.current;
    if (!container) return;
    requestAnimationFrame(() => {
      if (last) last.scrollIntoView({ behavior: 'smooth', block: 'end' });
      else container.scrollTop = container.scrollHeight;
    });
  }, [history.length]);

  const handleSend = async (text: string) => {
    if (!selectedSessionId) return;
    const ans = await api.sendQuestion(selectedSessionId, text);
    setHistory(prev => [...prev, ans]);
  };

  const handleFeedback = async (messageId: string, feedback: 'like'|'dislike') => {
    setHistory(prev => prev.map(h => h.messageId === messageId ? { ...h, feedback } : h));
  };

  if (!selectedSessionId) {
    return <div className="flex-1 flex items-center justify-center">Create a new chat.</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
      <div 
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 md:px-6"
      >
        <div className="max-w-3xl mx-auto py-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                No messages yet. Start a conversation!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((message) => (
                <div key={message.messageId} className="space-y-2">
                  <div className="flex items-start gap-4">
                    <div className="text-sm">{message.question}</div>
                  </div>
                  <AnswerTable sessionId={selectedSessionId} answer={message} onFeedback={handleFeedback} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4">
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};
