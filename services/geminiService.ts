import { GoogleGenAI } from "@google/genai";
import { Dream } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const interpretDream = async (dream: Dream): Promise<string> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
      Act as a professional Jungian dream analyst and psychologist. 
      Interpret the following dream entry.
      
      Title: ${dream.title}
      Date: ${new Date(dream.date).toLocaleDateString()}
      Mood: ${dream.mood}
      Lucidity: ${dream.lucidity}
      Content: "${dream.content}"
      
      Please provide a concise but insightful interpretation (max 300 words). 
      Focus on potential symbols, emotional undercurrents, and what this might mean for the dreamer's waking life.
      Use Markdown formatting for readability (bolding key terms).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate an interpretation at this time.";
  } catch (error) {
    console.error("Gemini Interpretation Error:", error);
    return "Error: Unable to connect to the AI interpreter. Please check your connection or API key.";
  }
};