
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-brand-purple border-l-brand-purple border-b-brand-purple/50 border-r-brand-purple/50 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-300 animate-pulse-fast">Conjuring your masterpiece...</p>
      <p className="text-gray-500">This can take a moment.</p>
    </div>
  );
};
