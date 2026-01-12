import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStrategy = async (businessType: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a digital strategist for KaizenStat, an agency run by IIT Madras Data Science scholars.
      The user runs a business in the "${businessType}" niche.
      
      Provide a SINGLE, high-impact strategy tip (max 50 words) on how they can use AI or Data Analytics to scale. 
      Tone: Academic yet commercially aggressive. Professional.
      Do not use introductory phrases. Just give the strategy.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Focus on proprietary data aggregation to create a moat against competitors.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Leverage predictive analytics to anticipate customer needs before they articulate them.";
  }
};