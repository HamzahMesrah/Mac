
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { DownloadIcon } from './icons/DownloadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface ImageGalleryProps {
  images: string[];
  isLoading: boolean;
  prompt: string;
}

const ImageCard: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${alt.slice(0, 30).replace(/\s/g, '_')}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg animate-fade-in aspect-square">
      <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={handleDownload}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Download image"
        >
          <DownloadIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, prompt }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-700">
        <ImageIcon className="mx-auto w-16 h-16 text-gray-600" />
        <h3 className="mt-4 text-xl font-semibold text-gray-400">Your creations will appear here</h3>
        <p className="mt-1 text-gray-500">Enter a prompt and click "Generate" to see the magic.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Generated Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <ImageCard key={index} src={image} alt={`Generated image ${index + 1} for prompt: ${prompt}`} />
        ))}
      </div>
    </div>
  );
};
