
import React from 'react';
import { AspectRatio } from '../types';
import { ASPECT_RATIOS, IMAGE_COUNTS } from '../constants';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  numberOfImages: number;
  setNumberOfImages: (count: number) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  numberOfImages,
  setNumberOfImages,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Your Creative Prompt
        </label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cinematic shot of a raccoon in a library, wearing a monocle, surrounded by floating books"
          className="w-full bg-gray-900/50 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200 resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Number of Images
          </label>
          <div className="flex space-x-2">
            {IMAGE_COUNTS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setNumberOfImages(count)}
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  numberOfImages === count
                    ? 'bg-brand-purple text-white shadow-lg'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Aspect Ratio
          </label>
          <div className="relative">
             <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                disabled={isLoading}
                className="w-full appearance-none bg-gray-700 border-gray-600 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-all duration-200"
             >
                {ASPECT_RATIOS.map((ratio) => (
                    <option key={ratio.value} value={ratio.value}>
                        {ratio.label} ({ratio.value})
                    </option>
                ))}
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
             </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-purple to-brand-pink text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <MagicWandIcon className="w-6 h-6" />
            Generate Images
          </>
        )}
      </button>
    </form>
  );
};
