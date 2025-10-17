import React, { useState } from 'react';
import type { Answer } from '../types';

type Props = {
  sessionId?: string;
  answer: Answer;
  onFeedback?: (messageId: string, feedback: 'like'|'dislike') => Promise<void>;
};

export const AnswerTable: React.FC<Props> = ({ answer, onFeedback }) => {
  const [feedback, setFeedback] = useState<Answer['feedback']>(answer.feedback ?? null);

  const give = async (f: 'like'|'dislike') => {
    setFeedback(f);
    if (onFeedback) await onFeedback(answer.messageId, f);
  };

  return (
    <div className="p-4 mt-3 bg-white dark:bg-gray-800 rounded shadow">
      <div className="text-sm mb-3 text-gray-700 dark:text-gray-200">{answer.description}</div>

      <div className="overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              {answer.answer.columns.map((c) => (
                <th
                  key={c}
                  className="px-3 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>    
          <tbody className="bg-white dark:bg-gray-800">
            {answer.answer.rows.map((row, i) => (
              <tr key={i} className="odd:bg-gray-50 dark:odd:bg-gray-900 even:bg-white dark:even:bg-gray-800">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-sm text-gray-800 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-3">
        <button
          onClick={() => give('like')}
          className={`px-3 py-1 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
            ${feedback === 'like'
              ? 'bg-green-100 text-green-900 border-green-200 dark:bg-green-600 dark:text-white dark:border-green-700'
              : 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          aria-pressed={feedback === 'like'}
        >
          Like
        </button>

        <button
          onClick={() => give('dislike')}
          className={`px-3 py-1 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
            ${feedback === 'dislike'
              ? 'bg-red-100 text-red-900 border-red-200 dark:bg-red-600 dark:text-white dark:border-red-700'
              : 'bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
          aria-pressed={feedback === 'dislike'}
        >
          Dislike
        </button>
      </div>
    </div>
  );
};
