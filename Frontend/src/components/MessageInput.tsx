import React, { useState } from 'react';

type Props = {
  onSend: (text: string) => Promise<void>;
  placeholder?: string;
};

export const MessageInput: React.FC<Props> = ({ onSend, placeholder }) => {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await onSend(text.trim());
      setText('');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Ask a question..."}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
          dark:border-gray-700 bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-500
          text-gray-900 dark:text-gray-100"
      />
      <button
        onClick={handleSend}
        disabled={!text.trim() || sending}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors"
      >
        {sending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};
