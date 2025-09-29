
import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-center gap-3 animate-fade-in" role="alert">
      <WarningIcon className="w-6 h-6" />
      <div>
        <strong className="font-bold">Oops! </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};
