
import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { ImageGallery } from './components/ImageGallery';
import { ErrorMessage } from './components/ErrorMessage';
import { generateImagesFromPrompt } from './services/geminiService';
import { AspectRatio } from './types';
import { CameraIcon } from './components/icons/CameraIcon';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [numberOfImages, setNumberOfImages] = useState<number>(2);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesFromPrompt(prompt, numberOfImages, aspectRatio);
      setGeneratedImages(images);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setGeneratedImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, numberOfImages, aspectRatio]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center items-center gap-4 mb-2">
            <CameraIcon className="w-12 h-12 text-brand-purple" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-purple to-brand-pink text-transparent bg-clip-text">
              AI Photo Booth
            </h1>
          </div>
          <p className="text-lg text-gray-400 mt-2">
            Turn your imagination into stunning visuals.
          </p>
        </header>

        <main>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-700/50">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              numberOfImages={numberOfImages}
              setNumberOfImages={setNumberOfImages}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              isLoading={isLoading}
              onSubmit={handleGenerate}
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="mt-12">
            <ImageGallery
              images={generatedImages}
              isLoading={isLoading}
              prompt={prompt}
            />
          </div>
        </main>
        
        <footer className="text-center text-gray-500 mt-12 pb-4">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
