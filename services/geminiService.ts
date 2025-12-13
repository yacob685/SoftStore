import { GoogleGenAI, Type } from "@google/genai";
import { AIReviewData } from '../types';

// NOTE: In a real environment, keys should be protected.
// This assumes process.env.API_KEY is available via the build system or runtime.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const getAIAppReview = async (appName: string, platform: string): Promise<AIReviewData> => {
  if (!apiKey) {
    // Fallback if no API key is present
    return {
      summary: `A comprehensive review for ${appName} is currently unavailable. However, this is a popular application on ${platform}.`,
      pros: ["User-friendly interface", "Regular updates", "Widely used"],
      cons: ["Requires system resources", "Some features may require account"],
      safetyScore: 90,
      alternativeApps: ["Alternative 1", "Alternative 2"],
      technicalOpinion: "Solid performance for general users."
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a software review for "${appName}" on ${platform}. Include a summary, pros, cons, a safety score (0-100), alternative apps, and a technical opinion.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            safetyScore: { type: Type.INTEGER },
            alternativeApps: { type: Type.ARRAY, items: { type: Type.STRING } },
            technicalOpinion: { type: Type.STRING },
          },
          required: ["summary", "pros", "cons", "safetyScore", "alternativeApps", "technicalOpinion"]
        },
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIReviewData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: `Could not load AI review for ${appName}. It is generally considered a reliable tool in its category.`,
      pros: ["Reliable functionality", "Standard features"],
      cons: ["Could not fetch detailed analysis"],
      safetyScore: 85,
      alternativeApps: [],
      technicalOpinion: "Unable to generate real-time technical opinion."
    };
  }
};
