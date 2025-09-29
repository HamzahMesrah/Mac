
import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImagesFromPrompt = async (
  prompt: string,
  numberOfImages: number,
  aspectRatio: AspectRatio
): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('Image generation failed. The model did not return any images.');
    }
    
    const base64Images = response.generatedImages.map((img) => {
        if(!img.image.imageBytes) {
            throw new Error('API response is missing image data.');
        }
        return `data:image/jpeg;base64,${img.image.imageBytes}`
    });

    return base64Images;
  } catch (error) {
    console.error('Error generating images:', error);
    let errorMessage = 'Failed to generate images due to an unexpected error.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    // Re-throw a more user-friendly error
    throw new Error(`Image generation failed: ${errorMessage}`);
  }
};
